import {
  Alignment,
  isCollapsed,
  KEY_ALIGN,
  setAlign,
  someNode,
  usePlateEditorState,
} from "@udecode/plate";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";
import { MouseEvent, useCallback } from "react";

export interface AlignToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  value: Alignment;
  pluginKey?: string;
}

export function AlignToolbarButton(props: AlignToolbarButtonProps) {
  const { value, pluginKey = KEY_ALIGN, ...buttonProps } = props;
  const editor = usePlateEditorState();

  const selected =
    isCollapsed(editor?.selection) &&
    someNode(editor, { match: { [pluginKey]: value } });

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setAlign(editor, {
        value: e.currentTarget.value as Alignment,
        key: pluginKey,
      });
    },
    [editor, pluginKey]
  );

  return (
    <ToolbarButton
      selected={selected}
      onMouseDown={onMouseDown}
      value={value}
      {...buttonProps}
    />
  );
}

export default AlignToolbarButton;
