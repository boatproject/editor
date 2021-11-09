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

export type ListToolbarButtonProps = BlockToolbarButtonProps;

export function ListToolbarButton(props: BlockToolbarButtonProps) {
  const { value = ELEMENT_UL, ...elementProps } = props;
  const editor = usePlateEditorState();

  const res = !!editor?.selection && getListItemEntry(editor);

  return (
    <BlockToolbarButton
      selected={!!res && res.list[0].type === value}
      value={value}
      onMouseDown={
        editor &&
        getPreventDefaultHandler(toggleList, editor, {
          type: value,
        })
      }
      {...elementProps}
    />
  );
}

export default ListToolbarButton;
