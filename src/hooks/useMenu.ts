import { SyntheticEvent, useState } from "react";
import useEventCallback from "./useEventCallback";

/**
 * Utility hook for binding menu and anchor properties,
 * including open/close state management
 */
export default function useMenu(menuId: string) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const onClick = useEventCallback(
    (event: SyntheticEvent<HTMLElement>) => setElement(event.currentTarget),
    []
  );
  const onClose = useEventCallback(() => setElement(null), []);

  const id = element ? menuId : undefined;
  const open = Boolean(element);

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
