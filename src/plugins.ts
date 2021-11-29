import {
  createReactPlugin,
  createHistoryPlugin,
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
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createParagraphPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createLineHeightPlugin,
  createPlugins,
  PlatePlugin,
  // createAutoformatPlugin,
} from "@udecode/plate";
import { CONFIG } from "./config";

/**
 * Create any plugins that dont require dynamic configuration
 * @param config
 * @returns
 */
function createStaticPlugins(config = CONFIG) {
  const corePlugins = [createReactPlugin(), createHistoryPlugin()];

  const elementPlugins = [
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createAlignPlugin(config.align),
    createLineHeightPlugin(config.lineHeight),
    createSelectOnBackspacePlugin(config.selectOnBackspace),
    createIndentPlugin(config.indent),
    createLinkPlugin(),
    createListPlugin(),
    createTodoListPlugin(),
    createImagePlugin(),
  ];

  const markPlugins = [
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createCodeBlockPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
  ];

  const utilPlugins = [
    createResetNodePlugin(config.resetBlockType),
    createSoftBreakPlugin(config.softBreak),
    createExitBreakPlugin(config.exitBreak),
    // createAutoformatPlugin(PLUGINS_CONFIG.autoFormat),
  ];

  return [...corePlugins, ...elementPlugins, ...markPlugins, ...utilPlugins];
}

const PLUGINS = createStaticPlugins(CONFIG);

/**
 * Get full array of plugins. Needed to create dynamic
 * plugins that take props from outside the component
 */
export function createEditorPlugins<T = Record<string, unknown>>() {
  return createPlugins<T>(
    PLUGINS as PlatePlugin<T, Record<string, unknown>>[],
    { components: CONFIG.components }
  );
}
