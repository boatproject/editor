import { DependencyList, useCallback, useEffect, useRef } from "react";

const throwOnRender = () => {
  throw new Error("Cannot call an event handler while rendering.");
};

/**
 * Memoize a callback function that holds
 * the same function reference on every render.
 *
 * *Must be called outside of render,
 * usually while handling an event*
 * @param fn
 * @param deps
 * @returns
 */
export default function useEventCallback<A extends unknown[], R>(
  fn: (...args: A) => R,
  deps: DependencyList
) {
  const ref = useRef<typeof fn>(throwOnRender);

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);

  return useCallback((...args: A): R => {
    const fn = ref.current;
    return fn(...args);
  }, []);
}
