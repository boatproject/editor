import { Button, ButtonProps, Paper, styled, Tooltip } from "@mui/material";

interface TileProps {
  title: string;
  value: string;
}

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

export type ColorTileProps = TileProps & ButtonProps;

export function ColorTile(props: ColorTileProps) {
  const { title, value, ...buttonProps } = props;
  return (
    <Paper>
      <Tooltip title={title}>
        <TileButton
          {...buttonProps}
          name={`pick-color-${props.value}`}
          value={value}
        />
      </Tooltip>
    </Paper>
  );
}

export default ColorTile;
