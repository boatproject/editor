import { Button, Stack } from "@mui/material";
import { useState, type MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";
import { DEFAULT_COLOR_OPTIONS, type ColorOption } from "./colors";
import { ColorContainer, TileButton } from "./styled";

function useColorPicker({
  color: propColor,
  onSelectColor,
  onClearColor,
}: Omit<ColorPickerProps, "colorOptions">) {
  const [color, setColor] = useState<string | undefined>(propColor);

  const selectColor = useEvent((event: MouseEvent<HTMLButtonElement>) => {
    const color = event.currentTarget.value;

    onSelectColor?.(color);
    setColor(color);
  });

  const clearColor = useEvent(() => {
    onClearColor?.();
    setColor(undefined);
  });

  return {
    color,
    selectColor,
    clearColor,
  };
}

export interface ColorPickerProps {
  /**
   * Selected color
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
  colorOptions = DEFAULT_COLOR_OPTIONS,
  ...props
}: ColorPickerProps) {
  const { clearColor, selectColor, color } = useColorPicker(props);

  return (
    <Stack
      alignItems="center"
      border={`3px solid ${color ?? "transparent"}`}
      p={1}
      sx={(theme) => ({ transition: theme.transitions.create("border") })}
    >
      <Button fullWidth onClick={clearColor} disabled={!color} sx={{ color }}>
        Clear
      </Button>
      <ColorContainer>
        {colorOptions.map(({ name, value }) => (
          <TileButton
            variant="contained"
            key={value}
            title={name}
            name={name}
            value={value}
            onClick={selectColor}
          />
        ))}
      </ColorContainer>
    </Stack>
  );
}
