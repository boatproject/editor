import { SyntheticEvent, useState } from "react";
import useEventCallback from "./useEventCallback";

/**
 * Utility hook for managing menu anchor state
 */
export function useMenuAnchor() {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const onClick = useEventCallback(
    (event: SyntheticEvent<HTMLElement>) => setElement(event.currentTarget),
    []
  );
  const onClose = useEventCallback(() => setElement(null), []);

  return {
    element,
    onClick,
    onClose,
  } as const;
}

export default useMenuAnchor;
