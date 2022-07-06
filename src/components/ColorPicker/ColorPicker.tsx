import { Button } from "@mui/material";
import { useState, MouseEvent } from "react";
import { ColorOption, DEFAULT_COLOR_OPTIONS } from "./colors";
import { Stack, styled } from "@mui/material";
import { ColorPickerTileGrid } from "./ColorPickerTileGrid";
import useEvent from "../../hooks/useEvent";

const ColorPickerStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: string }>(({ theme, color = "transparent" }) => ({
  padding: theme.spacing(1),
  border: `3px solid ${color}`,
  transition: theme.transitions.create("border"),
}));

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

export function ColorPicker(props: ColorPickerProps) {
  const {
    color,
    colorOptions = DEFAULT_COLOR_OPTIONS,
    onSelectColor,
    onClearColor,
  } = props;

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
    <ColorPickerStack color={selectedColor} alignItems="center">
      <Button
        fullWidth
        onClick={handleClear}
        disabled={!selectedColor}
        sx={{ color: selectedColor }}
      >
        Clear
      </Button>
      <ColorPickerTileGrid colorOptions={colorOptions} onClick={handleClick} />
    </ColorPickerStack>
  );
}

export default ColorPicker;
