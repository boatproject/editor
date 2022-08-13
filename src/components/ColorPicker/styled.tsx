import { styled, Button, type ButtonProps } from "@mui/material";
import type { ColorOption } from "./colors";

export const TileButton: (
  props: ButtonProps & ColorOption
) => JSX.Element | null = styled(Button)<ColorOption>(({ theme, value }) => ({
  backgroundColor: value,
  width: "100%",
  height: "100%",
  transition: theme.transitions.create("all"),

  "&:hover": {
    backgroundColor: value,
    opacity: 1,
  },
}));
