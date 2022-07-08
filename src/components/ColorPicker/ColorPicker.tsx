import { Button, Grid, Paper, Stack, useTheme } from "@mui/material";
import { useState, type MouseEvent } from "react";
import useEvent from "../../hooks/useEvent";
import { DEFAULT_COLOR_OPTIONS, type ColorOption } from "./colors";
import { TileButton } from "./styled";

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
  const theme = useTheme();

  return (
    <Stack
      component={Paper}
      alignItems="center"
      border={`3px solid ${color ?? "transparent"}`}
      p={1}
      gap={1}
      sx={{ transition: theme.transitions.create("border") }}
    >
      <Button
        fullWidth
        onClick={clearColor}
        disabled={!color}
        sx={{
          color,
          fontWeight: 600,
          transition: theme.transitions.create("all"),

          "&:hover": {
            color: color ? theme.palette.getContrastText(color) : undefined,
            bgcolor: color,
          },
        }}
      >
        Clear
      </Button>
      <Grid
        container
        spacing={0.5}
        columns={4}
        height={300}
        width={300}
        p={1}
        sx={{
          "&:hover": {
            "& .MuiButton-root:not(:hover)": {
              opacity: 0.7,
            },
          },
        }}
      >
        {colorOptions.map(({ name, value }) => (
          <Grid item key={value} xs={1} minHeight="20%">
            <TileButton
              variant="contained"
              title={name}
              name={name}
              value={value}
              onClick={selectColor}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
