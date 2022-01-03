import { Box, Menu, MenuProps } from "@mui/material";
import { ReactNode } from "react";
import ToolbarButton, {
  ToolbarButtonProps,
} from "./ToolbarButtons/ToolbarButton";
import { useMenu, UseMenuReturnMenu } from "../../hooks";

export type ToolbarMenuRenderChildren = (
  menuProps: UseMenuReturnMenu
) => ReactNode;

export interface ToolbarMenuProps {
  /**
   * Id passed to menu
   */
  menuId: string;
  /**
   * Menu items; Accepts react nodes or a render function to be called with the generated menuProps
   */
  children?: ReactNode | ToolbarMenuRenderChildren;
  /**
   * Icon to display on toolbar.
   */
  icon: ReactNode;
  /**
   * @default ""
   */
  value?: string;
  /**
   * Title displayed by tooltip
   */
  title?: NonNullable<ReactNode>;
  selected?: boolean;
  /**
   * Additional props passed to button component.
   * Will overwrite props that already have values.
   */
  buttonProps?: Partial<ToolbarButtonProps>;
  /**
   * Additional props passed to menu component.
   * Will overwrite props that already have values.
   */
  menuProps?: Partial<MenuProps>;
}

export function ToolbarMenu(props: ToolbarMenuProps) {
  const {
    menuId,
    icon,
    value = "",
    title,
    selected,
    children,
    buttonProps,
    menuProps: propMenuProps,
  } = props;

  const [anchorProps, menuProps] = useMenu(menuId);

  return (
    <>
      <ToolbarButton
        {...anchorProps}
        value={value}
        selected={selected}
        title={title}
        {...buttonProps}
      >
        {icon}
      </ToolbarButton>
      <Menu {...menuProps} {...propMenuProps}>
        <Box px={1}>
          {typeof children === "function" ? children(menuProps) : children}
        </Box>
      </Menu>
    </>
  );
}

export default ToolbarMenu;
