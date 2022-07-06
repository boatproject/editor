import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { ElementType } from "react";

export type ToolbarButtonProps<D extends ElementType = "button"> =
  ToggleButtonProps<
    D,
    {
      component?: D;
      /**
       * Value passed to button. Typically, represents
       * a plugin value to pass in an event handler.
       */
      value: string;
    }
  >;

export default function ToolbarButton<D extends ElementType>({
  title = "",
  value,
  ...buttonProps
}: ToolbarButtonProps<D>) {
  return (
    <ToggleButton
      title={title}
      value={value}
      size="small"
      sx={{ border: 0 }}
      {...buttonProps}
    />
  );
}
