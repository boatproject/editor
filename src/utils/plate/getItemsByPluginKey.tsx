/**
 * Extract a list of values from an object indexed by pluginKey
 * @param pluginKeys
 * @returns
 */

export default function getItemsByPluginKey<Item>(
  pluginMap: Record<string, Item>,
  ...pluginKeys: string[]
) {
  return pluginKeys.map((key) => pluginMap[key]).filter(Boolean);
}
