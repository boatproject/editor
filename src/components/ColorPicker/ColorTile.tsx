import { Button, ButtonProps, Paper, styled, Tooltip } from "@mui/material";
import { Color } from "./colors";

interface TileProps {
  color: Color;
}

const TileButton = styled(Button, {
  name: "ColorPicker",
  slot: "tileButton",
})<{ value: string }>(({ value }) => ({
  backgroundColor: value,
  padding: 0,
  transition: "all 200ms ease",
  minHeight: "100%",
  minWidth: "100%",

  "&:hover": {
    opacity: 1,
    backgroundColor: value,
  },
}));

export type ColorTileProps = TileProps & Omit<ButtonProps, "color">;

export function ColorTile(props: ColorTileProps) {
  const { color, ...buttonProps } = props;
  return (
    <Paper>
      <Tooltip title={color.name} disableInteractive>
        <TileButton {...buttonProps} name={color.name} value={color.value} />
      </Tooltip>
    </Paper>
  );
}

export default ColorTile;
