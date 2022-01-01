import { useCallback, useEffect, useRef } from "react";
import { Menu, Popover, PopoverProps } from "@mui/material";
import { ANCHOR_ORIGIN, ColorPicker, ColorPickerProps } from "./ColorPicker";

export interface ColorPickerMenuProps
  extends Pick<PopoverProps, "open" | "anchorEl">,
    ColorPickerProps {
  id?: string;
  /**
   * If true, automatically close window when
   * a color is selected or cleared
   */
  closeOnSelect?: boolean;
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
    closeOnSelect = true,
  } = props;

  const handleCloseOnSelect = useRef<(() => void) | null>(null);

  useEffect(() => {
    handleCloseOnSelect.current = closeOnSelect && onClose ? onClose : null;
  }, [closeOnSelect, onClose]);

  const handleSelectColor = useCallback(
    (color: string) => {
      onSelectColor?.(color);

      handleCloseOnSelect.current?.();
    },
    [onSelectColor]
  );

  const handleClearColor = useCallback(() => {
    onClearColor?.();

    handleCloseOnSelect.current?.();
  }, [onClearColor]);

  // return (
  //   <Popover
  //     id={id}
  //     anchorOrigin={ANCHOR_ORIGIN}
  //     onClose={onClose}
  //     open={open}
  //     anchorEl={anchorEl}
  //   >
  //     <ColorPicker
  //       color={color}
  //       colorOptions={colorOptions}
  //       onSelectColor={handleSelectColor}
  //       onClearColor={handleClearColor}
  //     />
  //   </Popover>
  // );
  return (
    <Menu
      id={id}
      anchorOrigin={ANCHOR_ORIGIN}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <ColorPicker
        color={color}
        colorOptions={colorOptions}
        onSelectColor={handleSelectColor}
        onClearColor={handleClearColor}
      />
    </Menu>
  );
}

export default ColorPickerMenu;
