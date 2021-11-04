import {
  styled,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";

export interface ToolbarButtonGroupProps extends ToggleButtonGroupProps {}

export const ToolbarButtonGroup = styled(
  ToggleButtonGroup
)<ToolbarButtonGroupProps>(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default ToolbarButtonGroup;
