import {
  createPlateComponents,
  createPlateOptions,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ELEMENT_CODE_BLOCK,
  ELEMENT_TD,
  KEYS_HEADING,
  MARK_COLOR,
  withStyledProps,
  StyledLeaf,
  MARK_BG_COLOR,
  MARK_FONT_SIZE,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  AlignPluginOptions,
  AutoformatPluginOptions,
  ExitBreakPluginOptions,
  IndentPluginOptions,
  NormalizeTypesPluginOptions,
  PlatePluginOptions,
  ResetBlockTypePluginOptions,
  SelectOnBackspacePluginOptions,
  SoftBreakPluginOptions,
  TrailingBlockPluginOptions,
  // createAutoformatPlugin,
} from "@udecode/plate";
import { EditableProps } from "slate-react/dist/components/editable";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

function createComponents() {
  return createPlateComponents({
    [MARK_COLOR]: withStyledProps(StyledLeaf, {
      leafProps: {
        [MARK_COLOR]: ["color"],
      },
    }),
    [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
      leafProps: {
        [MARK_BG_COLOR]: ["backgroundColor"],
      },
    }),
    [MARK_FONT_SIZE]: withStyledProps(StyledLeaf, {
      leafProps: {
        [MARK_FONT_SIZE]: ["fontSize"],
      },
    }),
  });
}

export interface Config {
  options: Record<string, PlatePluginOptions>;
  components: Record<string, any>;
  editableProps: EditableProps;
  align: AlignPluginOptions;
  // autoformat: AutoformatPluginOptions;
  exitBreak: ExitBreakPluginOptions;
  indent: IndentPluginOptions;
  resetBlockType: ResetBlockTypePluginOptions;
  selectOnBackspace: SelectOnBackspacePluginOptions;
  softBreak: SoftBreakPluginOptions;
}

export const CONFIG: Config = {
  components: createComponents(),
  options: createPlateOptions(),
  editableProps: {},
  align: {
    types: [
      ELEMENT_PARAGRAPH,
      ELEMENT_H1,
      ELEMENT_H2,
      ELEMENT_H3,
      ELEMENT_H4,
      ELEMENT_H5,
      ELEMENT_H6,
    ],
  },
  // autoFormat: {
  //   rules: [autoformatArrow],
  // },
  indent: {
    types: [
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
  resetBlockType: {
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
  softBreak: {
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
  exitBreak: {
    rules: [
      { hotkey: "mod+enter" },
      { hotkey: "mod+shift+enter", before: true },
      {
        hotkey: "enter",
        query: { start: true, end: true, allow: KEYS_HEADING },
      },
    ],
  },
  selectOnBackspace: { allow: [ELEMENT_IMAGE, ELEMENT_HR] },
};
