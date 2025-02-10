/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const isEnvironment =
  (environment: 'development' | 'production' | 'test') =>
  (callback: (...args: any[]) => void) =>
    process.env.NODE_ENV === environment ? callback : () => null

export const logger = {
  info: isEnvironment('development')((...args: any[]) => {
    console.info(...args)
  }),
  warn: isEnvironment('development')((...args: any[]) => {
    console.warn(...args)
  }),
  error: isEnvironment('development')((...args: any[]) => {
    console.error(...args)
  }),
}

logger.info('Logger initialized')
