import { createContext, useContext } from "react";

export type Logger = Pick<Console, "debug" | "error" | "info" | "log" | "warn">;

export const defaultLogger = console;

export const LoggerContext = createContext<Logger>(defaultLogger);
LoggerContext.displayName = "LoggerContext";

/**
 * Get provided logger
 */
export function useLogger() {
  return useContext(LoggerContext);
}

export default LoggerContext;
