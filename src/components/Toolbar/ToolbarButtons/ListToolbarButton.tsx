import {
  ELEMENT_UL,
  usePlateEditorState,
  getListItemEntry,
  toggleList,
} from "@udecode/plate";
import {
  BlockToolbarButton,
  BlockToolbarButtonProps,
} from "./BlockToolbarButton";
import { MouseEvent, useCallback } from "react";

export type ListToolbarButtonProps = BlockToolbarButtonProps;

export function ListToolbarButton(props: BlockToolbarButtonProps) {
  const { value = ELEMENT_UL, ...elementProps } = props;
  const editor = usePlateEditorState();

  const res = !!editor?.selection && getListItemEntry(editor);

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleList(editor, { type: e.currentTarget.value });
    },
    [editor]
  );

  return (
    <BlockToolbarButton
      selected={!!res && res.list[0].type === value}
      value={value}
      onMouseDown={onMouseDown}
      {...elementProps}
    />
  );
}

export default ListToolbarButton;
