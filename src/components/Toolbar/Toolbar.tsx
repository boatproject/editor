import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { HTMLAttributes, memo } from "react";
import AlignToolbarButtonGroup from "./AlignToolbarButtonGroup";
import BlockToolbarButtonGroup, {
  BlockToolbarButtonGroupProps,
} from "./BlockToolbarButtonGroup";
import IndentToolbarButtonGroup from "./IndentToolbarButtonGroup";
import ListToolbarButtonGroup from "./ListToolbarButtonGroup";
import MarkToolbarButtonGroup from "./MarkToolbarButtonGroup";
import HeadingToolbarMenu from "./HeadingToolbarMenu";

export interface ToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    BlockToolbarButtonGroupProps {}

const ToolbarRoot = styled(MuiToolbar, {
  name: "Toolbar",
  slot: "Root",
})(({ theme }) => ({
  gap: theme.spacing(0.2),
  flexWrap: "wrap",
  padding: "10px",
}));

const Toolbar = memo(function Toolbar({
  getLinkUrl,
  uploadImage,
  ...props
}: ToolbarProps) {
  return (
    <ToolbarRoot {...props} disableGutters variant="dense">
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
