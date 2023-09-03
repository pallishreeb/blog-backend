const winston = require("winston");
const { transports, format, createLogger } = winston;
const { label, combine, printf, timestamp } = format;

const prodLogger = () => {
  // Custom date for logging files with date of occurance
  const options = {
    error: {
      level: "error",
      dirname: "logs",
      json: true,
      handleExceptions: true,
      filename: `error.log`,
    },
    console: {
      level: "debug",
      json: false,
      handleExceptions: true,
      colorize: true,
    },
  };

  return new createLogger({
    format: combine(
      label({
        label: `Label🏷️`,
      }),
      timestamp({
        format: "MMM-DD-YYYY HH:mm:ss.sss",
      }),
      printf(
        (info) =>
          `Level:[${info.level}] LogTime: [${info.timestamp}] Message:-[${info.message}]`
      )
    ),
    transports: [
      new transports.File(options.error),
      new transports.Console(options.console),
    ],
    exitOnError: false,
  });
};
module.exports = prodLogger;
