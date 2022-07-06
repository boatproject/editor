import type { MouseEventHandler } from "react";
import ColorContainer from "./ColorContainer";
import type { ColorOption } from "./colors";
import ColorTile from "./ColorTile";

export interface ColorPickerTileGridProps {
  colorOptions: ColorOption[];
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ColorPickerTileGrid({
  colorOptions,
  onClick,
}: ColorPickerTileGridProps) {
  return (
    <ColorContainer>
      {colorOptions.map((color) => (
        <ColorTile key={color.value} {...color} onClick={onClick} />
      ))}
    </ColorContainer>
  );
}
