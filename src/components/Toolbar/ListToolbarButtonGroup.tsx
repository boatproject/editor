import { memo } from "react";
import { usePlateEditorRef } from "@udecode/plate-core";
import { ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL } from "@udecode/plate-list";
import { CheckBox, FormatListBulleted, FormatListNumbered } from "../../icons";
import resolvePluginType from "../../plate-utils/resolvePluginType";
import BlockToolbarButton from "./BlockToolbarButton";
import ListToolbarButton from "./ListToolbarButton";

const ListToolbarButtonGroup = memo(function ListToolbarButtonGroup() {
  const editor = usePlateEditorRef();

  return (
    <>
      <ListToolbarButton
        value={resolvePluginType(editor, ELEMENT_UL)}
        title="Bulleted List"
      >
        <FormatListBulleted />
      </ListToolbarButton>
      <ListToolbarButton
        value={resolvePluginType(editor, ELEMENT_OL)}
        title="Numbered List"
      >
        <FormatListNumbered />
      </ListToolbarButton>
      <BlockToolbarButton
        value={resolvePluginType(editor, ELEMENT_TODO_LI)}
        title="Check List"
      >
        <CheckBox />
      </BlockToolbarButton>
    </>
  );
});

export default ListToolbarButtonGroup;
