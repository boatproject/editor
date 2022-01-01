import useMenuAnchor from "./useMenuAnchor";

/**
 * Utility hook for binding menu and anchor properties,
 * including open/close state management
 */
export function useMenu<AnchorEl extends HTMLElement = HTMLButtonElement>(
  menuId: string
) {
  const { element, onClick, onClose } = useMenuAnchor<AnchorEl>();
  const open = Boolean(element);

  const id = element ? menuId : undefined;

  const anchorProps = {
    "aria-controls": id,
    "aria-haspopup": "true",
    "aria-expanded": open,
    onClick,
  } as const;

  const menuProps = {
    id,
    open,
    anchorEl: element,
    onClose,
  } as const;

  return [anchorProps, menuProps] as const;
}

export type UseMenuReturnAnchor = ReturnType<typeof useMenu>[0];
export type UseMenuReturnMenu = ReturnType<typeof useMenu>[1];

export default useMenu;
