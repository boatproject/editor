import { PopoverProps, Button } from "@mui/material";
import { useCallback, useEffect, useState, MouseEvent, useRef } from "react";
import ColorContainer from "./ColorContainer";
import { ColorPickerRoot } from "./ColorPickerRoot";
import { DEFAULT_COLORS } from "./colors";
import { ColorTile } from "./ColorTile";
import { OnSelectColorEventHandler } from "./types";

export interface ColorPickerProps
  extends Omit<PopoverProps, "children" | "onClose"> {
  color?: string;
  /** Memoized options for selecting color */
  colorOptions?: string[];
  onSelectColor?: OnSelectColorEventHandler;
  clearColor?: () => void;
  /** If true, automatically close window when a color is selected */
  closeOnSelect?: boolean;
  onClose?: () => void;
}

export function ColorPicker(props: ColorPickerProps) {
  const {
    color,
    colorOptions = DEFAULT_COLORS,
    onSelectColor,
    clearColor,
    onClose,
    closeOnSelect = true,
    ...popoverProps
  } = props;

  const [selectedColor, setSelectedColor] = useState<string | undefined>(color);
  const colorRef = useRef(color);
  useEffect(() => {
    if (colorRef.current !== color) {
      setSelectedColor(color);
      colorRef.current = color;
    }
  }, [color]);

  const selectColor = useCallback(
    (color: string) => {
      onSelectColor?.(color);
      setSelectedColor(color);

      if (closeOnSelect && onClose) {
        onClose();
      }
    },
    [onSelectColor, onClose, closeOnSelect]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const color = event.currentTarget.value;
      selectColor(color);
    },
    [selectColor]
  );

  const handleClear = useCallback(() => {
    clearColor?.();
    setSelectedColor(undefined);
  }, [clearColor]);

  return (
    <ColorPickerRoot color={selectedColor} onClose={onClose} {...popoverProps}>
      <ColorContainer sx={{ width: 300, height: 300 }}>
        {colorOptions.map((color) => (
          <ColorTile key={color} value={color} onClick={handleClick} />
        ))}
      </ColorContainer>
      <Button
        fullWidth
        onClick={handleClear}
        disabled={!selectedColor}
        sx={{ color: selectedColor }}
      >
        Clear
      </Button>
    </ColorPickerRoot>
  );
}

export default ColorPicker;
