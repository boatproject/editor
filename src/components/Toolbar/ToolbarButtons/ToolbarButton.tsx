import {
  styled,
  ToggleButton,
  ToggleButtonProps,
  Tooltip,
} from "@mui/material";
import { ForwardedRef, forwardRef, ReactNode } from "react";

export interface ToolbarButtonProps extends ToggleButtonProps {
  /** Plugin type */
  value: string;
  tooltip?: ReactNode;
}

const ToolbarButtonRoot = styled(ToggleButton)(() => ({
  border: 0,
}));

export const ToolbarButton = forwardRef(function ToolbarButton(
  props: ToolbarButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { tooltip, ...buttonProps } = props;

  const button = <ToolbarButtonRoot ref={ref} size="small" {...buttonProps} />;

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
});

export default ToolbarButton;
