import {
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
} from "@mui/icons-material";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate";

export const pluginIcons = {
  [ELEMENT_H1]: LooksOne,
  [ELEMENT_H2]: LooksTwo,
  [ELEMENT_H3]: Looks3,
  [ELEMENT_H4]: Looks4,
  [ELEMENT_H5]: Looks5,
  [ELEMENT_H6]: Looks6,
};

type PluginIcons = typeof pluginIcons;

/**
 * Gets an icon from the pluginIcons config object
 */
export function getPluginIcon(pluginKey: keyof typeof pluginIcons) {
  return pluginIcons[pluginKey];
}

export interface PluginIconProps {
  pluginKey: keyof PluginIcons;
}

export function PluginIcon(props: PluginIconProps) {
  const { pluginKey } = props;

  const Icon = getPluginIcon(pluginKey);

  return <Icon />;
}

export default PluginIcon;
