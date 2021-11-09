import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { ToolbarButtons, ToolbarButtonsProps } from "./ToolbarButtons";

export interface ToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    ToolbarButtonsProps {}

export const ToolbarRoot = styled(MuiToolbar, {
  name: "Toolbar",
  slot: "Root",
})(({ theme }) => ({
  justifyContent: "center",
  gap: theme.spacing(0.5),
  flexWrap: "wrap",
}));

export const Toolbar = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { getImageUrl, getLinkUrl, ...toolbarProps } = props;

  return (
    <ToolbarRoot {...toolbarProps} ref={ref}>
      <ToolbarButtons getImageUrl={getImageUrl} getLinkUrl={getLinkUrl} />
    </ToolbarRoot>
  );
});

export default Toolbar;
