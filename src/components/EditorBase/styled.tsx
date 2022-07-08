import { Stack, styled } from "@mui/material";

export const EditorBaseStack = styled(Stack, {
  name: "EditorBase",
  slot: "Stack",
})(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  lineHeight: "1.4375em",
  position: "relative",
  cursor: "text",
  boxSizing: "border-box",
  width: "100%",
}));
