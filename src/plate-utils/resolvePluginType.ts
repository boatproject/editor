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
  editor: PlateEditor<V> | null = null,
  key: string
): string {
  return editor ? getPluginType(editor, key) : key;
}
