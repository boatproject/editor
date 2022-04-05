import { createContext, useContext } from "react";

export type Logger = Pick<Console, "debug" | "error" | "info" | "log" | "warn">;

const LoggerContext = createContext<Logger>(console);
LoggerContext.displayName = "LoggerContext";

/**
 * Get provided logger
 */
export function useLogger() {
  return useContext(LoggerContext);
}

export default LoggerContext;
