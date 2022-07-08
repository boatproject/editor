import { usePlateEditorState } from "@udecode/plate-core";
import { ELEMENT_UL, getListItemEntry, toggleList } from "@udecode/plate-list";
import BlockToolbarButton, {
  BlockToolbarButtonProps,
} from "./BlockToolbarButton";
import { MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";

export type ListToolbarButtonProps = BlockToolbarButtonProps;

export function ListToolbarButton({
  value = ELEMENT_UL,
  ...elementProps
}: BlockToolbarButtonProps) {
  const editor = usePlateEditorState();

  const res = !!editor?.selection && getListItemEntry(editor);

  const onMouseDown = useEvent((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    toggleList(editor, { type: e.currentTarget.value });
  });

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
