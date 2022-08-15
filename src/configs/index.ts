import { createPlateUI } from "@udecode/plate-ui";
import { CONFIG } from "./config";
import { createStaticPlugins } from "./plugins";

const PLUGINS = createStaticPlugins(CONFIG, createPlateUI());

export { CONFIG, PLUGINS };
