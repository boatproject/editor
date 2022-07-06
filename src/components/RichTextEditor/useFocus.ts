import { FocusEvent, FocusEventHandler, useState } from "react";
import useEvent from "../../hooks/useEvent";

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

  return [
    focused,
    {
      onFocus: useEvent((e: FocusEvent<E>) => {
        setFocused(true);

        onFocus?.(e);
      }),
      onBlur: useEvent((e: FocusEvent<E>) => {
        setFocused(false);

        onBlur?.(e);
      }),
    },
  ] as const;
}
