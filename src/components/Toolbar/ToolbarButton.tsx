import { ToggleButton, ToggleButtonProps, Tooltip } from "@mui/material";
import { ElementType, ReactNode, memo } from "react";

export type ToolbarButtonProps<D extends ElementType = "button"> = {
  /**
   * Value passed to button. Typically, represents
   * a plugin value to pass in an event handler.
   */
  value: string;
  /**
   * Title passed to tooltip component
   */
  title?: NonNullable<ReactNode>;
} & ToggleButtonProps<D, { component?: D }>;

const ToolbarButton = memo(function ToolbarButton<
  D extends ElementType = "button"
>({ title = "", value, ...buttonProps }: ToolbarButtonProps<D>) {
  return (
    <Tooltip title={title} disableInteractive>
      <ToggleButton
        value={value}
        size="small"
        sx={{ border: 0 }}
        {...buttonProps}
      />
    </Tooltip>
  );
});

export default ToolbarButton;
