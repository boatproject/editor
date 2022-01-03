import { useState } from "react";
import useEventCallback from "./useEventCallback";

export type AnchorClickEvent<AnchorEl extends HTMLElement = HTMLButtonElement> =
  (event: { currentTarget: EventTarget & AnchorEl }) => void;
export type AnchorInstance<AnchorEl extends HTMLElement = HTMLButtonElement> =
  Readonly<{
    element: AnchorEl | null;
    onClick: AnchorClickEvent<AnchorEl>;
    onClose: () => void;
  }>;

/**
 * Utility hook for managing menu anchor state
 */
export function useMenuAnchor<
  AnchorEl extends HTMLElement = HTMLButtonElement
>(): AnchorInstance<AnchorEl> {
  const [element, setElement] = useState<AnchorEl | null>(null);

  const onClick: AnchorClickEvent<AnchorEl> = useEventCallback(
    (event) => setElement(event.currentTarget),
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
