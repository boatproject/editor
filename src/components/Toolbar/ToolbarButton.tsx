import { ToggleButton, type ToggleButtonProps } from "@mui/material";
import type { ElementType } from "react";

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
  ...buttonProps
}: ToolbarButtonProps<D>) {
  return <ToggleButton size="small" sx={{ border: 0 }} {...buttonProps} />;
}
