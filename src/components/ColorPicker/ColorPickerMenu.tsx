import { Popover, PopoverProps } from "@mui/material";
import { ColorPicker, ColorPickerProps } from "./ColorPicker";

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

export function ColorPickerMenu(props: ColorPickerMenuProps) {
  const {
    id,
    color,
    colorOptions,
    onSelectColor,
    onClearColor,
    anchorEl,
    open = false,
    onClose,
  } = props;

  return (
    <Popover
      id={id}
      anchorOrigin={ANCHOR_ORIGIN}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
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

export default ColorPickerMenu;
