import { createContext } from "react";
import { Logger } from "./logger";

export const defaultLogger = console;

export const LoggerContext = createContext<Logger>(defaultLogger);
LoggerContext.displayName = "LoggerContext";

export default LoggerContext;
