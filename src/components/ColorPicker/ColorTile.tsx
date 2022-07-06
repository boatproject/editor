import { Button, type ButtonProps, Paper, styled } from "@mui/material";
import type { ColorOption } from "./colors";

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

type TileProps = ColorOption & Pick<ButtonProps, "onClick">;

export default function ColorTile(props: TileProps) {
  return (
    <Paper>
      <TileButton title={props.name} {...props} />
    </Paper>
  );
}
