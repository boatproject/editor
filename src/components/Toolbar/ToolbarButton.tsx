import { ToggleButton, type ToggleButtonProps } from "@mui/material";
import type { ElementType } from "react";

export type ToolbarButtonProps<D extends ElementType = "button"> =
  ToggleButtonProps<D, { component?: D; value: string }>;

export default function ToolbarButton<D extends ElementType>(
  props: ToolbarButtonProps<D>
) {
  return (
    <ToggleButton size="small" {...props} sx={{ border: 0, ...props.sx }} />
  );
}
