export interface Logger {
  debug(...data: unknown[]): void;
  debug(message?: unknown, ...optionalParams: unknown[]): void;

  error(...data: unknown[]): void;
  error(message?: unknown, ...optionalParams: unknown[]): void;

  info(...data: unknown[]): void;
  info(message?: unknown, ...optionalParams: unknown[]): void;

  log(...data: unknown[]): void;
  log(message?: unknown, ...optionalParams: unknown[]): void;

  warn(...data: unknown[]): void;
  warn(message?: unknown, ...optionalParams: unknown[]): void;
}
