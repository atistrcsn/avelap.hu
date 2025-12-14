const pino = require("pino");
import { Logger } from "pino";

let logger: Logger;

if (process.env.NODE_ENV === 'production') {
  logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
    level: process.env.PINO_LOG_LEVEL || "info",
    redact: [], // prevent logging of sensitive data
  });
} else {
  // In development, use console for better readability
  logger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
    // Add other levels as needed
  } as any;
}

export { logger };