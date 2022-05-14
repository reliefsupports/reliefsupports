const { createLogger, format, transports } = require('winston');

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || 'debug';

function formatParams(info) {
  // eslint-disable-next-line no-shadow
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
}

// https://github.com/winstonjs/winston/issues/1135
const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger;

if (process.env.NODE_ENV !== 'production') {
  logger = createLogger({
    level,
    format: developmentFormat,
    transports: [new transports.Console()],
  });
} else {
  logger = createLogger({
    level,
    format: productionFormat,
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });
}

module.exports = logger;
