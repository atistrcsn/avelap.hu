// Thin console shim — replaces pino logger for static-export compatibility.
// No server-only runtime required; works in both Node.js and Edge environments.
export const logger = {
  info: (...args: unknown[]) => console.log(...args),
  error: (...args: unknown[]) => console.error(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  debug: (...args: unknown[]) => console.debug(...args),
};
