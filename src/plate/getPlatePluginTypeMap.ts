import { getPlatePluginType, PEditor, PlateEditor } from "@udecode/plate";

export function getPlatePluginTypeMap<K extends string[]>(
  editor?: PlateEditor<PEditor>,
  ...pluginKeys: [...K]
): { [Key in K[number]]: string } {
  const pluginTypes = {} as { [Key in K[number]]: string };

  for (const key of pluginKeys) {
    pluginTypes[key] = getPlatePluginType(editor, key);
  }
  return pluginTypes;
}

export default getPlatePluginTypeMap;
