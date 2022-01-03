import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { HTMLAttributes, memo } from "react";
import {
  AlignToolbarButtonGroup,
  BlockToolbarButtonGroup,
  BlockToolbarButtonGroupProps,
  IndentToolbarButtonGroup,
  ListToolbarButtonGroup,
  MarkToolbarButtonGroup,
} from "./ToolbarButtonGroups";
import { HeadingToolbarMenu } from "./HeadingToolbarMenu";

export interface ToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    BlockToolbarButtonGroupProps {}

export const ToolbarRoot = styled(MuiToolbar, {
  name: "Toolbar",
  slot: "Root",
})(({ theme }) => ({
  gap: theme.spacing(0.2),
  flexWrap: "wrap",
  padding: "10px",
}));

export const Toolbar = memo(function Toolbar(props: ToolbarProps) {
  const { getLinkUrl, uploadImage, ...toolbarProps } = props;

  return (
    <ToolbarRoot {...toolbarProps} disableGutters variant="dense">
      <MarkToolbarButtonGroup />
      <HeadingToolbarMenu />
      <BlockToolbarButtonGroup
        getLinkUrl={getLinkUrl}
        uploadImage={uploadImage}
      />
      <IndentToolbarButtonGroup />
      <ListToolbarButtonGroup />
      <AlignToolbarButtonGroup />
    </ToolbarRoot>
  );
});

export default Toolbar;
