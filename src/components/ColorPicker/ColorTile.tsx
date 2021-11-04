import { Button, ButtonProps, Paper, styled } from "@mui/material";

interface TileProps {
  value: string;
}

const TileButton = styled(Button, {
  name: "ColorPicker",
  slot: "tileButton",
})<TileProps>(({ value }) => ({
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

export type ColorTileProps = TileProps & ButtonProps;

export function ColorTile(props: ColorTileProps) {
  return (
    <Paper>
      <TileButton {...props} />
    </Paper>
  );
}

export default ColorTile;
