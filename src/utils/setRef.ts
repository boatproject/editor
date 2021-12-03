import { MutableRefObject } from "react";

type Ref<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null;

/**
 * Sets ref that is either callback or mutable object
 * @param ref — A ref callback or ref object. If anything falsy, this is a no-op.
 *
 */
export default function setRef<T>(ref: Ref<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
