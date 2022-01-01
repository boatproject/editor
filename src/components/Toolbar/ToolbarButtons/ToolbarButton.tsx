import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
  Tooltip,
} from "@mui/material";
import { ElementType, ReactNode, memo } from "react";

export type ToolbarButtonProps<D extends ElementType = "button"> = {
  value: string;
  title?: NonNullable<ReactNode>;
} & ToggleButtonProps<D, { component?: D }>;

const ToggleButton = styled(MuiToggleButton)({
  border: 0,
});

export const ToolbarButton = memo(function ToolbarButton<
  D extends ElementType = "button"
>(props: ToolbarButtonProps<D>) {
  const { title = "", value, ...buttonProps } = props;

  return (
    <Tooltip title={title} disableInteractive>
      <ToggleButton value={value} size="small" {...buttonProps} />
    </Tooltip>
  );
});

export default ToolbarButton;
