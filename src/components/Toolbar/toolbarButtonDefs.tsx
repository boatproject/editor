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
import { getItemsByPluginKey } from "../../utils";

/**
 * A definition for each button to be built
 */
export interface ToolbarButtonDef {
  pluginKey: string;
  icon: JSX.Element;
  title: string;
}

export type ToolbarButtonDefMap = Record<string, ToolbarButtonDef>;

export function mapItemsByPluginKey(
  items: ToolbarButtonDef[]
): ToolbarButtonDefMap {
  return items.reduce((map, item) => {
    map[item.pluginKey] = item;

    return map;
  }, {} as ToolbarButtonDefMap);
}

/**
 * List of definitions for toolbar buttons described by pluginKey
 */
const toolbarButtonDefs: ToolbarButtonDef[] = [
  { pluginKey: ELEMENT_H1, icon: <LooksOne />, title: "Heading One" },
  { pluginKey: ELEMENT_H2, icon: <LooksTwo />, title: "Heading Two" },
  { pluginKey: ELEMENT_H3, icon: <Looks3 />, title: "Heading Three" },
  { pluginKey: ELEMENT_H4, icon: <Looks4 />, title: "Heading Four" },
  { pluginKey: ELEMENT_H5, icon: <Looks5 />, title: "Heading Five" },
  { pluginKey: ELEMENT_H6, icon: <Looks6 />, title: "Heading Six" },
];

/**
 * Map of defined plugins indexed by plugin key
 */
export const toolbarButtonDefMap = mapItemsByPluginKey(toolbarButtonDefs);

export const getButtonDefsByPluginKey = (...pluginKeys: string[]) =>
  getItemsByPluginKey(toolbarButtonDefMap, ...pluginKeys);
