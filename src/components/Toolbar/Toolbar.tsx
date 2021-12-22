import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { ForwardedRef, forwardRef, HTMLAttributes, memo } from "react";
import {
  ToolbarAlignButtons,
  ToolbarBlockButtons,
  ToolbarBlockButtonsProps,
  ToolbarHeadingButtons,
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

const ToolbarBase = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { getImageUrl, getLinkUrl, uploadImage, ...toolbarProps } = props;

  return (
    <ToolbarRoot {...toolbarProps} ref={ref} disableGutters variant="dense">
      <ToolbarMarkButtons />
      <ToolbarHeadingButtons />
      <ToolbarBlockButtons
        getImageUrl={getImageUrl}
        getLinkUrl={getLinkUrl}
        uploadImage={uploadImage}
      />
      <ToolbarIndentButtons />
      <ToolbarListButtons />
      <ToolbarAlignButtons />
    </ToolbarRoot>
  );
});

export const Toolbar = memo(ToolbarBase);

export default Toolbar;
