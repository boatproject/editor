import { FocusEvent, FocusEventHandler, useState } from "react";
import useEventCallback from "../../hooks/useEventCallback";

export interface FocusHandlers<E extends HTMLElement> {
  onFocus?: FocusEventHandler<E>;
  onBlur?: FocusEventHandler<E>;
}

/**
 * Get focused state with wrapped handlers that manage the state
 */
export default function useFocus<E extends HTMLElement>(
  handlers: FocusHandlers<E> = {}
) {
  const { onFocus, onBlur } = handlers;
  const [focused, setFocused] = useState(false);

  const wrappedHandlers = {
    onFocus: useEventCallback(
      (e: FocusEvent<E>) => {
        setFocused(true);

        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus]
    ),
    onBlur: useEventCallback(
      (e: FocusEvent<E>) => {
        setFocused(false);

        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur]
    ),
  };

  return [focused, wrappedHandlers] as const;
}
