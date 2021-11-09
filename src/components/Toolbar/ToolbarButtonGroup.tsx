import {
  styled,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";

export type ToolbarButtonGroupProps = ToggleButtonGroupProps;

export const ToolbarButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
