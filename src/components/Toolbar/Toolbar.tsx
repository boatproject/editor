import { styled, Toolbar as MuiToolbar } from "@mui/material";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { ToolbarButtonsMarks } from "./ToolbarButtonsMarks";
import {
  ToolbarButtonsElements,
  ToolbarButtonsElementsProps,
} from "./ToolbarButtonsElements";

export interface ToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    ToolbarButtonsElementsProps {
  showElements?: boolean;
  showMarks?: boolean;
}

export const Toolbar = styled(
  forwardRef(function Toolbar(
    props: ToolbarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    const {
      getImageUrl,
      getLinkUrl,
      showElements = true,
      showMarks = true,
      ...toolbarProps
    } = props;

    return (
      <MuiToolbar {...toolbarProps} ref={ref}>
        {showMarks && <ToolbarButtonsMarks />}
        {showElements && (
          <ToolbarButtonsElements
            getImageUrl={getImageUrl}
            getLinkUrl={getLinkUrl}
          />
        )}
      </MuiToolbar>
    );
  })
)({
  justifyContent: "center",
  gap: 1,
  flexWrap: "wrap",
});

export default Toolbar;
