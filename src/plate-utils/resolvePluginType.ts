import {
  getPluginType,
  type PlateEditor,
  type Value,
} from "@udecode/plate-core";

/**
 * Extends getPluginType to handle a situation where editor might be null.
 *
 * @see {@link getPluginType}
 */
export default function resolvePluginType<V extends Value = Value>(
  editor: PlateEditor<V> | null,
  key: string
): string {
  if (!editor) {
    return key;
  }
  return getPluginType(editor, key);
}
