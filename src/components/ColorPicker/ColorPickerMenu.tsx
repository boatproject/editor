import { Popover, PopoverProps } from "@mui/material";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";

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
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      {...props}
    >
      <ColorPicker
        color={color}
        colorOptions={colorOptions}
        onSelectColor={onSelectColor}
        onClearColor={onClearColor}
      />
    </Popover>
  );
}
