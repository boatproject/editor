import {
  ELEMENT_UL,
  useStoreEditorState,
  useEventEditorId,
  getListItemEntry,
  getPreventDefaultHandler,
  toggleList,
} from "@udecode/plate";
import { ToolbarElement, ToolbarElementProps } from "./ToolbarElement";

export interface ToolbarListProps extends ToolbarElementProps {}

export function ToolbarList(props: ToolbarListProps) {
  const { value = ELEMENT_UL, ...elementProps } = props;
  const editor = useStoreEditorState(useEventEditorId("focus"));

  const res = !!editor?.selection && getListItemEntry(editor);

  return (
    <ToolbarElement
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

export default ToolbarList;
