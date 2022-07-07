import { Button, Stack } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { type ColorOption, DEFAULT_COLOR_OPTIONS } from "./colors";
import useEvent from "../../hooks/useEvent";
import ColorContainer from "./ColorContainer";
import ColorTile from "./ColorTile";

export interface ColorPickerProps {
  /**
   * Selected color
   *
   * This value is also stored internally.
   * Setting a different color that is passed
   * will trigger a state update to the internal value.
   */
  color?: string;
  /**
   * Memoized array of colors for populating color tiles
   */
  colorOptions?: ColorOption[];
  /**
   * Action called with a selected color
   */
  onSelectColor?: (color: string) => void;
  /**
   * Action called when color is cleared
   */
  onClearColor?: () => void;
}

export default function ColorPicker({
  color,
  colorOptions = DEFAULT_COLOR_OPTIONS,
  onSelectColor,
  onClearColor,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(color);

  const handleClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
    const color = event.currentTarget.value;

    onSelectColor?.(color);
    setSelectedColor(color);
  });

  const handleClear = useEvent(() => {
    onClearColor?.();
    setSelectedColor(undefined);
  });

  return (
    <Stack
      alignItems="center"
      border={`3px solid ${selectedColor ?? "transparent"}`}
      p={1}
      sx={{ transition: (theme) => theme.transitions.create("border") }}
    >
      <Button
        fullWidth
        onClick={handleClear}
        disabled={!selectedColor}
        sx={{ color: selectedColor }}
      >
        Clear
      </Button>
      <ColorContainer>
        {colorOptions.map((color) => (
          <ColorTile key={color.value} {...color} onClick={handleClick} />
        ))}
      </ColorContainer>
    </Stack>
  );
}
