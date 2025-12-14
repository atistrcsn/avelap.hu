export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV === 'production') {
      await require("pino");
      await require("next-logger");
    }
  }
}
