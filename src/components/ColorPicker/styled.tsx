import { styled, Button } from "@mui/material";
import type { ColorOption } from "./colors";

export const TileButton = styled(Button)<ColorOption>(({ theme, value }) => ({
  backgroundColor: value,
  width: "100%",
  height: "100%",
  transition: theme.transitions.create("all"),

  "&:hover": {
    backgroundColor: value,
    opacity: 1,
  },
}));
