import { type TextFieldProps, styled } from "@mui/material";
import NotchedOutlineRoot from "@mui/material/OutlinedInput/NotchedOutline";
import classes from "./classes";

export const EditorRoot = styled("div", {
  name: "Editor",
  slot: "EditorRoot",
  shouldForwardProp: (prop) => prop !== "color",
})<{
  color?: TextFieldProps["color"];
}>(({ theme, color = "primary" }) => {
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";

  return {
    position: "relative",
    marginTop: "8px",
    borderRadius: theme.shape.borderRadius,
    [`&:hover .${classes.notchedOutline}`]: {
      borderColor: theme.palette.text.primary,
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${classes.notchedOutline}`]: {
        borderColor,
      },
    },
    [`&.${classes.focused} .${classes.notchedOutline}`]: {
      borderColor: theme.palette[color].main,
      borderWidth: 2,
    },
    [`&.${classes.error} .${classes.notchedOutline}`]: {
      borderColor: theme.palette.error.main,
    },
    [`&.${classes.disabled} .${classes.notchedOutline}`]: {
      borderColor: theme.palette.action.disabled,
    },
  };
});

export const NotchedOutline = styled(NotchedOutlineRoot, {
  name: "Editor",
  slot: "NotchedOutline",
})(({ theme }) => ({
  borderColor:
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)",
}));
