import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  type ExitBreakPlugin,
  type SoftBreakPlugin,
} from "@udecode/plate-break";
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import {
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  type AnyObject,
  type PlatePlugin,
  type PlatePluginComponent,
  type PlateProps,
  type Value,
} from "@udecode/plate-core";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { type IndentPlugin } from "@udecode/plate-indent";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import type { ResetNodePlugin } from "@udecode/plate-reset-node";
import type { SelectOnBackspacePlugin } from "@udecode/plate-select";
import { ELEMENT_TD } from "@udecode/plate-table";
import type { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createPlateUI } from "@udecode/plate-ui";
import type { EditableProps } from "slate-react/dist/components/editable";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const textTypes = [
  ELEMENT_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
];

type PluginConfig<P = AnyObject, V extends Value = Value> = Partial<
  PlatePlugin<P, V>
>;

export interface Config<V extends Value = Value> {
  defaultProps: Partial<PlateProps<V>>;
  components: Record<string, PlatePluginComponent<V>>;
  editableProps: EditableProps;
  align: Partial<PlatePlugin>;
  lineHeight: Partial<PlatePlugin>;
  exitBreak: PluginConfig<ExitBreakPlugin, V>;
  indent: PluginConfig<IndentPlugin, V>;
  resetBlockType: PluginConfig<ResetNodePlugin, V>;
  selectOnBackspace: PluginConfig<SelectOnBackspacePlugin>;
  softBreak: PluginConfig<SoftBreakPlugin, V>;
  trailingBlock: PluginConfig<TrailingBlockPlugin, V>;
}

export const CONFIG: Config = {
  defaultProps: {
    initialValue: [{ type: "p", children: [{ text: "" }] }],
  },
  components: createPlateUI(),
  editableProps: {
    style: {
      minHeight: 150,
      padding: "12px 10px",
    },
  },
  align: {
    inject: {
      props: {
        validTypes: textTypes,
      },
    },
  },
  indent: {
    inject: {
      props: {
        validTypes: [...textTypes, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: 1.5,
        validNodeValues: [1, 1.2, 1.5, 2, 3],
        validTypes: textTypes,
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
      query: { allow: [ELEMENT_IMAGE, ELEMENT_HR] },
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
};
