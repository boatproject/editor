import {
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  TextFields,
} from "@mui/icons-material";
import { Box, Menu } from "@mui/material";
import {
  getPluginType,
  PlateEditor,
  findNode,
  usePlateEditorState,
} from "@udecode/plate-core";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { useMenu } from "../../hooks";
import BlockToolbarButton from "./ToolbarButtons/BlockToolbarButton";
import { ToolbarButton } from "./ToolbarButtons";
import { useMemo } from "react";

const headingButtonDefs = [
  {
    pluginKey: ELEMENT_H1,
    type: ELEMENT_H1,
    icon: <LooksOne />,
    title: "Heading One",
  },
  {
    pluginKey: ELEMENT_H2,
    type: ELEMENT_H2,
    icon: <LooksTwo />,
    title: "Heading Two",
  },
  {
    pluginKey: ELEMENT_H3,
    type: ELEMENT_H3,
    icon: <Looks3 />,
    title: "Heading Three",
  },
  {
    pluginKey: ELEMENT_H4,
    type: ELEMENT_H4,
    icon: <Looks4 />,
    title: "Heading Four",
  },
  {
    pluginKey: ELEMENT_H5,
    type: ELEMENT_H5,
    icon: <Looks5 />,
    title: "Heading Five",
  },
  {
    pluginKey: ELEMENT_H6,
    type: ELEMENT_H6,
    icon: <Looks6 />,
    title: "Heading Six",
  },
];

function getSelectedHeadingType(editor: PlateEditor): string | undefined {
  const headingTypes = headingButtonDefs.map(({ pluginKey }) =>
    getPluginType(editor, pluginKey)
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
  const selectedType = getSelectedHeadingType(editor);
  const selectedButtonDef = useMemo(
    () =>
      selectedType
        ? headingButtonDefs.find(
            (def) => getPluginType(editor, def.pluginKey) === selectedType
          )
        : null,
    [editor, selectedType]
  );

  const menuId = "toolbar-heading-menu";
  const [anchorProps, menuProps] = useMenu(menuId);
  const { open, onClose } = menuProps;

  return (
    <>
      <ToolbarButton
        {...anchorProps}
        value=""
        selected={Boolean(selectedType)}
        title="Heading"
      >
        {selectedButtonDef && !open ? selectedButtonDef.icon : <TextFields />}
      </ToolbarButton>
      <Menu {...menuProps}>
        <Box px={1}>
          {headingButtonDefs.map(({ pluginKey, title, icon }) => {
            const type = getPluginType(editor, pluginKey);
            return (
              <BlockToolbarButton
                key={pluginKey}
                value={type}
                title={title}
                onClick={onClose}
                selected={selectedType === type}
              >
                {icon}
              </BlockToolbarButton>
            );
          })}
        </Box>
      </Menu>
    </>
  );
}

export default HeadingToolbarMenu;
