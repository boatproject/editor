import { MouseEventHandler } from "react";
import ColorContainer from "./ColorContainer";
import { ColorOption } from "./colors";
import { ColorTile } from "./ColorTile";

export interface ColorPickerTileGridProps {
  colorOptions: ColorOption[];
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ColorPickerTileGrid(props: ColorPickerTileGridProps) {
  const { colorOptions, onClick } = props;
  return (
    <ColorContainer>
      {colorOptions.map((color) => (
        <ColorTile key={color.value} color={color} onClick={onClick} />
      ))}
    </ColorContainer>
  );
}
