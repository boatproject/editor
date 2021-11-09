import { Box, styled } from "@mui/material";

const GAP_SPACING = 0.5;

export const ColorContainer = styled(Box, {
  name: "ColorPicker",
  slot: "container",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(GAP_SPACING),
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
    minHeight: `calc(20% - ${theme.spacing(GAP_SPACING)})`,
    minWidth: `calc(20% - ${theme.spacing(GAP_SPACING)})`,
  },
}));

export default ColorContainer;
