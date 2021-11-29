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
  gap: theme.spacing(0.2),
  flexWrap: "wrap",
  marginBottom: theme.spacing(1),
}));

export const Toolbar = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { getImageUrl, getLinkUrl, uploadImage, ...toolbarProps } = props;

  return (
    <ToolbarRoot {...toolbarProps} ref={ref} disableGutters variant="dense">
      <ToolbarButtons
        getImageUrl={getImageUrl}
        getLinkUrl={getLinkUrl}
        uploadImage={uploadImage}
      />
    </ToolbarRoot>
  );
});

export default Toolbar;
