import { Menu, MenuProps } from "@mui/material";
import { MouseEvent, MouseEventHandler, ReactNode, useState } from "react";
import {
  ToolbarButton,
  ToolbarButtonProps,
} from "./ToolbarButtons/ToolbarButton";

export interface ToolbarDropdownProps extends ToolbarButtonProps {
  id?: string;
  icon: ReactNode;
  onClose?: MouseEventHandler;
  menuProps?: Partial<MenuProps>;
}

export function ToolbarDropdown(props: ToolbarDropdownProps) {
  const {
    id = "toolbar-dropdown-button",
    icon,
    value,
    selected,
    onClose,
    menuProps,
    ...buttonProps
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent) => {
    onClose?.(event);
    setAnchorEl(null);
  };

  const menuId = menuProps?.id ?? "toolbar-dropdown-menu";

  return (
    <>
      <ToolbarButton
        id={id}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        value={value}
        selected={selected}
        {...buttonProps}
      >
        {icon}
      </ToolbarButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": id,
        }}
        {...menuProps}
      />
    </>
  );
}

export default ToolbarDropdown;
