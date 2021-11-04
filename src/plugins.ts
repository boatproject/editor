import {
  createReactPlugin,
  createHistoryPlugin,
  createImagePlugin,
  createSelectOnBackspacePlugin,
  PlatePlugin,
  SPEditor,
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
  createDeserializeHTMLPlugin,
  createDeserializeAstPlugin,
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
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createLineHeightPlugin,
  WithImageUploadOptions,
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
    createAlignPlugin(),
    createLineHeightPlugin(config.lineHeight),
    createSelectOnBackspacePlugin(config.selectOnBackspace),
    createIndentPlugin(config.indent),
    createLinkPlugin(),
    createListPlugin(),
    createTodoListPlugin(),
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

  const plugins = [
    ...corePlugins,
    ...elementPlugins,
    ...markPlugins,
    ...utilPlugins,
  ];
  plugins.push(...createSerializerPlugins(plugins));

  return plugins;
}

/**
 * Create serializer plugins passing plugins as argument
 * @param plugins
 * @returns
 */
function createSerializerPlugins(plugins: PlatePlugin[]) {
  return [
    createDeserializeMDPlugin({ plugins }),
    createDeserializeCSVPlugin({ plugins }),
    createDeserializeHTMLPlugin({ plugins }),
    createDeserializeAstPlugin({ plugins }),
  ];
}

const PLUGINS = createStaticPlugins();

export type GetPluginsOptions = WithImageUploadOptions;

/**
 * Get full array of plugins. Needed to create dynamic
 * plugins that take props from outside the component
 */
export function createPlugins({ uploadImage }: GetPluginsOptions = {}) {
  const plugins = [...PLUGINS, createImagePlugin({ uploadImage })];
  plugins.push(...createSerializerPlugins(plugins));

  return plugins;
}
