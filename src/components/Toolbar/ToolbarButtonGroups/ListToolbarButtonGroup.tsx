import {
  CheckBox,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";
import {
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  getPluginType,
  usePlateEditorRef,
} from "@udecode/plate";
import { BlockToolbarButton } from "../ToolbarButtons/BlockToolbarButton";
import { ListToolbarButton } from "../ToolbarButtons/ListToolbarButton";

export function ListToolbarButtonGroup() {
  const editor = usePlateEditorRef();

  return (
    <>
      <ListToolbarButton
        value={getPluginType(editor, ELEMENT_UL)}
        title="Bulleted List"
      >
        <FormatListBulleted />
      </ListToolbarButton>
      <ListToolbarButton
        value={getPluginType(editor, ELEMENT_OL)}
        title="Numbered List"
      >
        <FormatListNumbered />
      </ListToolbarButton>
      <BlockToolbarButton
        value={getPluginType(editor, ELEMENT_TODO_LI)}
        title="Check List"
      >
        <CheckBox />
      </BlockToolbarButton>
    </>
  );
}
