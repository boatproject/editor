import { Box, Menu } from "@mui/material";
import { getPluginType, usePlateEditorState } from "@udecode/plate-core";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { useState } from "react";
import {
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  TextFields,
} from "../../icons";
import useMenu from "../../hooks/useMenu";
import BlockToolbarButton from "./BlockToolbarButton";
import ToolbarButton from "./ToolbarButton";

const headingIcons = {
  [ELEMENT_H1]: <LooksOne />,
  [ELEMENT_H2]: <LooksTwo />,
  [ELEMENT_H3]: <Looks3 />,
  [ELEMENT_H4]: <Looks4 />,
  [ELEMENT_H5]: <Looks5 />,
  [ELEMENT_H6]: <Looks6 />,
};

type HeadingKey = keyof typeof headingIcons;

export default function HeadingToolbarMenu() {
  const editor = usePlateEditorState();
  const [anchorProps, menuProps] = useMenu("toolbar-heading-menu");
  const [selectedHeading, setSelectedHeading] = useState<HeadingKey | null>(
    null
  );

  const showHeading = selectedHeading && !menuProps.open;

  return (
    <>
      <ToolbarButton
        {...anchorProps}
        value=""
        selected={Boolean(selectedHeading)}
        title="Heading"
      >
        {showHeading ? headingIcons[selectedHeading] : <TextFields />}
      </ToolbarButton>
      <Menu {...menuProps}>
        <Box px={1}>
          {editor ? (
            <>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H1)}
                title="Heading One"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H1);
                }}
              >
                <LooksOne />
              </BlockToolbarButton>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H2)}
                title="Heading Two"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H2);
                }}
              >
                <LooksTwo />
              </BlockToolbarButton>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H3)}
                title="Heading Three"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H3);
                }}
              >
                <Looks3 />
              </BlockToolbarButton>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H4)}
                title="Heading Four"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H4);
                }}
              >
                <Looks4 />
              </BlockToolbarButton>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H5)}
                title="Heading Five"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H5);
                }}
              >
                <Looks5 />
              </BlockToolbarButton>
              <BlockToolbarButton
                value={getPluginType(editor, ELEMENT_H6)}
                title="Heading Six"
                onClick={() => {
                  setSelectedHeading(ELEMENT_H6);
                }}
              >
                <Looks6 />
              </BlockToolbarButton>
            </>
          ) : null}
        </Box>
      </Menu>
    </>
  );
}
