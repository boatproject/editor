import { getPluginType, usePlateEditorRef } from "@udecode/plate";
import { useMemo } from "react";
import type { AnyObject } from "../../types";

/**
 * Memoized hook wrapper around plate getPluginType function
 * @param key
 * @returns
 */
export default function usePluginType<T = AnyObject>(key: string) {
  const editor = usePlateEditorRef<T>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getPluginType<T>(editor, key), [key]);
}
