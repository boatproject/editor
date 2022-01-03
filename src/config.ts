import {
  createPlateUI,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  // AutoformatPluginOptions,
  ExitBreakPlugin,
  IndentPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
  PlatePluginComponent,
  PlatePlugin,
  ResetNodePlugin,
  SelectOnBackspacePlugin,
  SoftBreakPlugin,
  TrailingBlockPlugin,
  ELEMENT_MEDIA_EMBED,
  PlateProps,
} from "@udecode/plate";
import { EditableProps } from "slate-react/dist/components/editable";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

type PluginConfig<T> = Partial<PlatePlugin<Record<string, unknown>, T>>;

export interface Config {
  defaultProps: Partial<PlateProps>;
  components: Record<string, PlatePluginComponent>;
  editableProps: EditableProps;
  /**
   * Merge additional props with the base config
   */
  getEditableProps: (props: EditableProps) => EditableProps;
  align: Partial<PlatePlugin>;
  // autoformat: AutoformatPluginOptions;
  lineHeight: Partial<PlatePlugin>;
  exitBreak: PluginConfig<ExitBreakPlugin>;
  indent: PluginConfig<IndentPlugin>;
  resetBlockType: PluginConfig<ResetNodePlugin>;
  selectOnBackspace: PluginConfig<SelectOnBackspacePlugin>;
  softBreak: PluginConfig<SoftBreakPlugin>;
  trailingBlock: PluginConfig<TrailingBlockPlugin>;
}

export const CONFIG: Config = {
  defaultProps: {
    initialValue: [{ type: "p", children: [{ text: "" }] }],
    // normalizeInitialValue: true,
  },
  components: createPlateUI(),
  editableProps: {
    style: {
      minHeight: 150,
      padding: "12px 10px",
    },
  },
  getEditableProps: (props) => ({ ...props, ...CONFIG.editableProps }),
  align: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  },
  // autoFormat: {
  //   rules: [autoformatArrow],
  // },
  indent: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
          ELEMENT_BLOCKQUOTE,
          ELEMENT_CODE_BLOCK,
        ],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: 1.5,
        validNodeValues: [1, 1.2, 1.5, 2, 3],
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  },
  resetBlockType: {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Enter",
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Backspace",
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },
  softBreak: {
    options: {
      rules: [
        { hotkey: "shift+enter" },
        {
          hotkey: "enter",
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    },
  },
  exitBreak: {
    options: {
      rules: [
        { hotkey: "mod+enter" },
        { hotkey: "mod+shift+enter", before: true },
        {
          hotkey: "enter",
          query: { start: true, end: true, allow: KEYS_HEADING },
        },
      ],
    },
  },
  selectOnBackspace: {
    options: {
      query: { allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED, ELEMENT_HR] },
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
};
