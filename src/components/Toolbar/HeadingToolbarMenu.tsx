import { TextFields } from "@mui/icons-material";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  getPluginType,
  PlateEditor,
  findNode,
  usePlateEditorState,
} from "@udecode/plate";
import { getButtonDefsByPluginKey } from "./toolbarButtonDefs";
import BlockToolbarButton from "./ToolbarButtons/BlockToolbarButton";
import ToolbarMenu from "./ToolbarMenu";

const headingPluginKeys = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
] as const;

const headingButtonDefs = getButtonDefsByPluginKey(...headingPluginKeys);

function getHeadingType(editor: PlateEditor) {
  const headingTypes = headingPluginKeys.map((key) =>
    getPluginType(editor, key)
  );
  const nodeEntry = findNode(editor, {
    match: { type: headingTypes },
  });
  if (nodeEntry) {
    const [node] = nodeEntry;
    return node.type;
  }

  return undefined;
}

export function HeadingToolbarMenu() {
  const editor = usePlateEditorState();
  const selectedHeading = getHeadingType(editor);

  return (
    <ToolbarMenu
      menuId="toolbar-heading-menu"
      title="Heading"
      icon={<TextFields />}
      selected={Boolean(selectedHeading)}
    >
      {({ onClose }) =>
        headingButtonDefs.map(({ pluginKey, title, icon }) => {
          const type = getPluginType(editor, pluginKey);
          return (
            <BlockToolbarButton
              key={pluginKey}
              value={type}
              title={title}
              onClick={onClose}
              selected={selectedHeading === type}
            >
              {icon}
            </BlockToolbarButton>
          );
        })
      }
    </ToolbarMenu>
  );
}

export default HeadingToolbarMenu;
