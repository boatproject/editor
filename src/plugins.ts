import { createAlignPlugin } from "@udecode/plate-alignment";
import { createBasicElementsPlugin } from "@udecode/plate-basic-elements";
import { createBasicMarksPlugin } from "@udecode/plate-basic-marks";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createPlugins } from "@udecode/plate-core";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import { createHighlightPlugin } from "@udecode/plate-highlight";
import { createImagePlugin } from "@udecode/plate-image";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin } from "@udecode/plate-link";
import { createListPlugin, createTodoListPlugin } from "@udecode/plate-list";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createPlateUI } from "@udecode/plate-ui";
import { CONFIG } from "./config";

/**
 * Create any plugins that don't require dynamic
 * configuration (from props or state)
 * @param config
 * @returns
 */
function createStaticPlugins(config = CONFIG) {
  return createPlugins(
    [
      /**
       * Element plugins
       */
      createAlignPlugin(config.align),
      createBasicElementsPlugin(),
      createImagePlugin(),
      createIndentPlugin(config.indent),
      createLineHeightPlugin(config.lineHeight),
      createLinkPlugin(),
      createListPlugin(),
      createSelectOnBackspacePlugin(config.selectOnBackspace),
      createTodoListPlugin(),
      /**
       * Mark plugins
       */
      createBasicMarksPlugin(),
      createFontBackgroundColorPlugin(),
      createFontColorPlugin(),
      createFontSizePlugin(),
      createHighlightPlugin(),
      /**
       * Util plugins
       */
      createExitBreakPlugin(config.exitBreak),
      createResetNodePlugin(config.resetBlockType),
      createSoftBreakPlugin(config.softBreak),
      createTrailingBlockPlugin(config.trailingBlock),
    ],
    {
      components: createPlateUI(),
    }
  );
}

export const PLUGINS = createStaticPlugins(CONFIG);
