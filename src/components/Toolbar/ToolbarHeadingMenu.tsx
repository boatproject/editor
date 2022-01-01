import { TextFields } from "@mui/icons-material";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  usePlateEditorRef,
  getPluginType,
} from "@udecode/plate";
import { getButtonDefsByPluginKey } from "./toolbarButtonDefs";
import BlockToolbarButton from "./ToolbarButtons/BlockToolbarButton";
import ToolbarMenu from "./ToolbarButtons/ToolbarMenu";

const headingPluginKeys = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
] as const;

const headingButtonDefs = getButtonDefsByPluginKey(...headingPluginKeys);

export function ToolbarHeadingMenu() {
  const editor = usePlateEditorRef();

  return (
    <ToolbarMenu
      menuId="toolbar-heading-menu"
      title="Headings"
      icon={<TextFields />}
    >
      {(menuProps) =>
        headingButtonDefs.map(({ pluginKey, title, icon }) => (
          <BlockToolbarButton
            key={pluginKey}
            value={getPluginType(editor, pluginKey)}
            title={title}
            onClick={() => menuProps.onClose()}
          >
            {icon}
          </BlockToolbarButton>
        ))
      }
    </ToolbarMenu>
  );
}

export default ToolbarHeadingMenu;
