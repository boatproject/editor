import { PopoverProps, Button } from "@mui/material";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import ColorContainer from "./ColorContainer";
import { ColorPickerRoot } from "./ColorPickerRoot";
import { DEFAULT_COLORS } from "./colors";
import { ColorTile } from "./ColorTile";
import { OnSelectColorEventHandler } from "./types";

export interface ColorPickerProps extends Omit<PopoverProps, "children"> {
  color?: string;
  /** Memoized options for selecting color */
  colorOptions?: string[];
  onSelectColor?: OnSelectColorEventHandler;
  clearColor?: () => void;
}

export function ColorPicker(props: ColorPickerProps) {
  const {
    color,
    colorOptions = DEFAULT_COLORS,
    onSelectColor,
    clearColor,
    ...popoverProps
  } = props;

  const [selectedColor, setSelectedColor] = useState<string | undefined>(color);

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const color = event.currentTarget.value;
      onSelectColor?.(color);
      setSelectedColor(color);
    },
    [onSelectColor]
  );

  const handleClear = useCallback(() => {
    clearColor?.();
    setSelectedColor(undefined);
  }, [clearColor]);

  return (
    <ColorPickerRoot color={selectedColor} {...popoverProps}>
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
