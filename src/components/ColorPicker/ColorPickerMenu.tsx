import { Popover, PopoverProps } from "@mui/material";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";

const ANCHOR_ORIGIN = {
  vertical: "bottom",
  horizontal: "center",
} as const;

export type ColorPickerMenuProps = PopoverProps & ColorPickerProps;

/**
 * Popover menu composed with ColorPicker
 */
export default function ColorPickerMenu({
  color,
  colorOptions,
  onSelectColor,
  onClearColor,
  ...props
}: ColorPickerMenuProps) {
  return (
    <Popover anchorOrigin={ANCHOR_ORIGIN} {...props}>
      <ColorPicker
        color={color}
        colorOptions={colorOptions}
        onSelectColor={onSelectColor}
        onClearColor={onClearColor}
      />
    </Popover>
  );
}
