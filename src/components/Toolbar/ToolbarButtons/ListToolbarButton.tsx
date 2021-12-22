import {
  ELEMENT_UL,
  usePlateEditorState,
  getListItemEntry,
  getPreventDefaultHandler,
  toggleList,
} from "@udecode/plate";
import {
  BlockToolbarButton,
  BlockToolbarButtonProps,
} from "./BlockToolbarButton";
import { useCallback } from "react";

export type ListToolbarButtonProps = BlockToolbarButtonProps;

export function ListToolbarButton(props: BlockToolbarButtonProps) {
  const { value = ELEMENT_UL, ...elementProps } = props;
  const editor = usePlateEditorState();

  const res = !!editor?.selection && getListItemEntry(editor);

  const onMouseDown = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      toggleList(editor, { type: value });
    },
    [editor, value]
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
