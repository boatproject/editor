import { useContext } from "react";
import LoggerContext from "./LoggerContext";

/**
 * Get provided logger
 */
export default function useLogger() {
  return useContext(LoggerContext);
}
