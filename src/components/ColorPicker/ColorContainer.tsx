import { Box, styled } from "@mui/material";

const ColorContainer = styled(Box)(({ theme }) => {
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

export default ColorContainer;
