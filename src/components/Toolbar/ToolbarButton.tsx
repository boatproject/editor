import { ToggleButton, ToggleButtonProps, Tooltip } from "@mui/material";
import { ForwardedRef, forwardRef, ReactNode } from "react";

export interface ToolbarButtonProps extends ToggleButtonProps {
  /** Plugin type */
  value: string;
  tooltip?: ReactNode;
}

export const ToolbarButton = forwardRef(function ToolbarButton(
  props: ToolbarButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { tooltip, ...buttonProps } = props;

  const button = <ToggleButton ref={ref} {...buttonProps} />;

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
});

export default ToolbarButton;
