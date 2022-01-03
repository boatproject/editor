import {
  createBasicElementsPlugin,
  createBasicMarksPlugin,
  createImagePlugin,
  createSelectOnBackspacePlugin,
  createIndentPlugin,
  createLinkPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,
  createListPlugin,
  createTodoListPlugin,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
  createHighlightPlugin,
  createAlignPlugin,
  createLineHeightPlugin,
  createPlugins,
  PlatePlugin,
  createPlateUI,
  createTrailingBlockPlugin,
  // createAutoformatPlugin,
} from "@udecode/plate";
import { AnyObject } from "./types";
import { CONFIG } from "./config";

/**
 * Create any plugins that dont require dynamic
 * configuration (from props or state)
 * @param config
 * @returns
 */
function createStaticPlugins(config = CONFIG) {
  const elementPlugins = [
    createBasicElementsPlugin(),
    createAlignPlugin(config.align),
    createLineHeightPlugin(config.lineHeight),
    createSelectOnBackspacePlugin(config.selectOnBackspace),
    createIndentPlugin(config.indent),
    createLinkPlugin(),
    createImagePlugin(),
    createListPlugin(),
    createTodoListPlugin(),
  ];

  const markPlugins = [
    createBasicMarksPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
  ];

  const utilPlugins = [
    createResetNodePlugin(config.resetBlockType),
    createSoftBreakPlugin(config.softBreak),
    createTrailingBlockPlugin(config.trailingBlock),
    createExitBreakPlugin(config.exitBreak),
    // createAutoformatPlugin(PLUGINS_CONFIG.autoFormat),
  ];

  return createPlugins<AnyObject>(
    [...elementPlugins, ...markPlugins, ...utilPlugins],
    {
      components: createPlateUI(),
    }
  );
}

export const PLUGINS = createStaticPlugins(CONFIG);

/**
 * Get full array of plugins. Needed to create dynamic
 * plugins that take props from outside the component
 */
export function createEditorPlugins() {
  return createPlugins(PLUGINS as PlatePlugin[], {
    components: createPlateUI(),
  });
}
