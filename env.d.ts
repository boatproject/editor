export interface BuildEnv {
  readonly ENABLE_BUNDLE_VISUALIZER?: boolean;
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends BuildEnv {}
  }
}
