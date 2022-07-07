import { Box, styled, Button } from "@mui/material";
import type { ColorOption } from "./colors";

export const TileButton = styled(Button)<ColorOption>(({ value, theme }) => ({
  backgroundColor: value,
  padding: 0,
  minHeight: "100%",
  minWidth: "100%",

  transition: theme.transitions.create("all"),

  "&:hover": {
    opacity: 1,
    backgroundColor: value,
  },
}));

export const ColorContainer = styled(Box)(({ theme }) => {
  const gapSpacing = theme.spacing(0.5);

  return {
    height: "300px",
    width: "300px",
    display: "flex",
    flexWrap: "wrap",
    gap: gapSpacing,
    padding: 0,
    marginBottom: theme.spacing(1),
    justifyContent: "center",
    alignContent: "center",

    "&:hover": {
      "& .MuiButton-root:not(:hover)": {
        opacity: 0.7,
      },
    },

    "& > *": {
      minHeight: `calc(20% - ${gapSpacing})`,
      minWidth: `calc(20% - ${gapSpacing})`,
    },
  };
});
