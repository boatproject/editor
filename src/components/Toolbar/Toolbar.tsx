import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { HTMLAttributes, memo } from "react";
import {
  ToolbarAlignButtons,
  ToolbarBlockButtons,
  ToolbarBlockButtonsProps,
  ToolbarHeadingMenu,
  ToolbarIndentButtons,
  ToolbarListButtons,
  ToolbarMarkButtons,
} from "./ToolbarButtons";

export interface ToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    ToolbarBlockButtonsProps {}

export const ToolbarRoot = styled(MuiToolbar, {
  name: "Toolbar",
  slot: "Root",
})(({ theme }) => ({
  gap: theme.spacing(0.2),
  flexWrap: "wrap",
  marginBottom: theme.spacing(1),
}));

export const Toolbar = memo(function Toolbar(props: ToolbarProps) {
  const { getLinkUrl, uploadImage, ...toolbarProps } = props;

  return (
    <ToolbarRoot {...toolbarProps} disableGutters variant="dense">
      <ToolbarMarkButtons />
      <ToolbarHeadingMenu />
      <ToolbarBlockButtons getLinkUrl={getLinkUrl} uploadImage={uploadImage} />
      <ToolbarIndentButtons />
      <ToolbarListButtons />
      <ToolbarAlignButtons />
    </ToolbarRoot>
  );
});

export default Toolbar;
