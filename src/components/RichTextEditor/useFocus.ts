import { FocusEvent, FocusEventHandler, useCallback, useState } from "react";

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
    onFocus: useCallback(
      (e: FocusEvent<E>) => {
        setFocused(true);

        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus]
    ),
    onBlur: useCallback(
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
