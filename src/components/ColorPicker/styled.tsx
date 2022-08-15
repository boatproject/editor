import { styled, Button, type ButtonProps } from "@mui/material";

type TileProps = { name: string; value: string };

type Props = ButtonProps & TileProps;

export const TileButton: (props: Props) => JSX.Element | null = styled(
  Button
)<TileProps>(({ theme, value }) => ({
  backgroundColor: value,
  width: "100%",
  height: "100%",
  transition: theme.transitions.create("all"),

  "&:hover": {
    backgroundColor: value,
    opacity: 1,
  },
}));
