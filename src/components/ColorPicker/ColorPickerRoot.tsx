import { Popover, PopoverProps, Stack, styled } from "@mui/material";
import { ReactNode } from "react";

export interface ColorPickerRootProps extends Omit<PopoverProps, "children"> {
  color?: string;
  children: ReactNode;
}

const ColorPickerStack = styled(Stack)(({ theme, color }) => ({
  padding: theme.spacing(1),
  border: `3px solid ${color}`,
  transition: "border 200ms ease",
}));

export function ColorPickerRoot(props: ColorPickerRootProps) {
  const { color = "transparent", children, ...popoverProps } = props;
  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      {...popoverProps}
    >
      <ColorPickerStack color={color}>{children}</ColorPickerStack>
    </Popover>
  );
}
