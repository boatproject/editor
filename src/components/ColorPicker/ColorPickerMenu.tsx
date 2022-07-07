import { Popover, PopoverProps } from "@mui/material";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";

export const ANCHOR_ORIGIN = {
  vertical: "bottom",
  horizontal: "center",
} as const;

export interface ColorPickerMenuProps
  extends Pick<PopoverProps, "open" | "anchorEl">,
    ColorPickerProps {
  id?: string;
  /**
   * Action called when closing menu
   */
  onClose?: () => void;
}

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
