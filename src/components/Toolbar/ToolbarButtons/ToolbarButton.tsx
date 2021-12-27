import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
  Tooltip,
} from "@mui/material";
import { ElementType, ReactNode } from "react";

export type ToolbarButtonProps<D extends ElementType = "button"> = {
  value: string;
  tooltip?: NonNullable<ReactNode>;
} & ToggleButtonProps<D, { component?: D }>;

const ToggleButton = styled(MuiToggleButton)({
  border: 0,
});

export function ToolbarButton<D extends ElementType = "button">(
  props: ToolbarButtonProps<D>
) {
  const { tooltip = "", value, ...buttonProps } = props;

  return (
    <Tooltip title={tooltip}>
      <ToggleButton value={value} size="small" {...buttonProps} />
    </Tooltip>
  );
}

export default ToolbarButton;
