import { FocusEvent, FocusEventHandler, useCallback, useState } from "react";

/**
 * Manage focus state and return onFocus and onBlur handlers
 */
export function useFocus<E extends HTMLElement>(handlers: {
  onFocus?: FocusEventHandler<E>;
  onBlur?: FocusEventHandler<E>;
}) {
  const { onFocus, onBlur } = handlers;
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: FocusEvent<E>) => {
      setFocused(true);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<E>) => {
      setFocused(false);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  return [focused, { onFocus: handleFocus, onBlur: handleBlur }] as const;
}
