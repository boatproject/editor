import { CONFIG } from "./config";
import { createStaticPlugins } from "./plugins";

const PLUGINS = createStaticPlugins(CONFIG);

export { CONFIG, PLUGINS };
