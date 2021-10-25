import {
  createReactPlugin,
  createHistoryPlugin,
  createBasicMarkPlugins,
  createBasicElementPlugins,
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
  // createAutoformatPlugin,
} from "@udecode/plate";
import { CONFIG } from "./config";

const PLUGIN_MAP = {
  core: [createReactPlugin(), createHistoryPlugin()],
  elements: {
    blockQuote: createBlockquotePlugin(),
    codeBlock: createCodeBlockPlugin(),
    heading: createHeadingPlugin(),
    paragraph: createParagraphPlugin(),
    align: createAlignPlugin(),
    image: createImagePlugin(),
    selectOnBackspace: createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
    indent: createIndentPlugin(CONFIG.indent),
    link: createLinkPlugin(),
    list: createListPlugin(),
    todoList: createTodoListPlugin(),
  },
  marks: {
    bold: createBoldPlugin(),
    italic: createItalicPlugin(),
    underline: createUnderlinePlugin(),
    strikethrough: createStrikethroughPlugin(),
    subscript: createSubscriptPlugin(),
    superscript: createSuperscriptPlugin(),
    code: createCodeBlockPlugin(),
    fontColor: createFontColorPlugin(),
    fontBg: createFontBackgroundColorPlugin(),
    fontSize: createFontSizePlugin(),
    highlight: createHighlightPlugin(),
  },
  util: {
    resetNode: createResetNodePlugin(CONFIG.resetBlockType),
    softBreak: createSoftBreakPlugin(CONFIG.softBreak),
    exitBreak: createExitBreakPlugin(CONFIG.exitBreak),
    // autoformat: createAutoformatPlugin(PLUGINS_CONFIG.autoFormat),
  },
};

function createSerializerPlugins(plugins: PlatePlugin[]) {
  plugins.push(
    ...[
      createDeserializeMDPlugin({ plugins }),
      createDeserializeCSVPlugin({ plugins }),
      createDeserializeHTMLPlugin({ plugins }),
      createDeserializeAstPlugin({ plugins }),
    ]
  );
  return plugins;
}

function createPlugins(): PlatePlugin<SPEditor>[] {
  const plugins = [
    ...Object.values(PLUGIN_MAP.core),
    ...Object.values(PLUGIN_MAP.elements),
    ...Object.values(PLUGIN_MAP.marks),
    ...Object.values(PLUGIN_MAP.util),
  ];

  createSerializerPlugins(plugins);

  return plugins;
}

export const PLUGINS = createPlugins();
