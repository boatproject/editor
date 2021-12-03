import { PopoverProps, Button } from "@mui/material";
import { useCallback, useEffect, useState, MouseEvent, useRef } from "react";
import ColorContainer from "./ColorContainer";
import { Color, DEFAULT_COLOR_OPTIONS } from "./colors";
import { ColorTile } from "./ColorTile";
import { OnSelectColorEventHandler } from "./types";
import { Popover, Stack, styled } from "@mui/material";

const ColorPickerStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: string }>(({ theme, color = "transparent" }) => ({
  padding: theme.spacing(1),
  border: `3px solid ${color}`,
  transition: theme.transitions.create("border"),
}));

export interface ColorPickerProps
  extends Pick<PopoverProps, "open" | "anchorEl"> {
  id?: string;
  color?: string;
  /**
   * Memoized array of colors for populating color tiles
   */
  colorOptions?: Color[];
  onSelectColor?: OnSelectColorEventHandler;
  clearColor?: () => void;
  /** If true, automatically close window when a color is selected */
  closeOnSelect?: boolean;
  onClose?: () => void;
}

export function ColorPicker(props: ColorPickerProps) {
  const {
    id,
    color,
    colorOptions = DEFAULT_COLOR_OPTIONS,
    onSelectColor,
    clearColor,
    anchorEl,
    open = false,
    onClose,
    closeOnSelect = true,
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
    <Popover
      id={id}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <ColorPickerStack color={selectedColor}>
        <ColorContainer sx={{ width: 300, height: 300 }}>
          {colorOptions.map((color) => (
            <ColorTile key={color.value} color={color} onClick={handleClick} />
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
      </ColorPickerStack>
    </Popover>
  );
}

export default ColorPicker;
