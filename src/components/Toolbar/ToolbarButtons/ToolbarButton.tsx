import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
  Tooltip,
} from "@mui/material";
import { ElementType, ReactNode } from "react";

export type ToolbarButtonProps<
  D extends ElementType = "button"
> = ToggleButtonProps<D, { tooltip?: ReactNode; component?: D; value: string }>;

// export interface ToolbarButtonProps<D extends ElementType = "button", P = {}>
//   extends ToggleButtonProps<D, P> {
//   /** Plugin type */
//   value: string;
//   tooltip?: ReactNode;
//   component?: D;
// }

const ToggleButton = styled(MuiToggleButton)({
  border: 0,
});

export function ToolbarButton<D extends ElementType = "button">(
  props: ToolbarButtonProps<D>
) {
  const { tooltip, ...buttonProps } = props;

  /**
   * Need to assert the type because the inferred
   * types on the rest doesn't work properly with
   * generic arguments
   */
  const button = (
    <ToggleButton
      size="small"
      {...((buttonProps as unknown) as ToggleButtonProps)}
    />
  );

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
}

export default ToolbarButton;
