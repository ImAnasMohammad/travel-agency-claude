/*
 *  FileName:-     logger.js
 *  Description:-  Winston logger with console and file transports (daily rotation)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const fs = require("fs");
const { env } = require("../../configs/envConfig");

const logDir = path.join(process.cwd(), env.LOG_DIR || "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const { combine, timestamp, printf, colorize, errors, json, splat } =
  winston.format;

/*
 *  functionName:- consoleFormat
 *  Description:-  Creates a human-readable log format for console output
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  splat(),
  printf(({ level, message, timestamp: ts, stack, ...meta }) => {
    const metaStr =
      Object.keys(meta).length > 0 ? `\n${JSON.stringify(meta, null, 2)}` : "";
    return `[${ts}] ${level}: ${stack || message}${metaStr}`;
  })
);

/*
 *  functionName:- fileFormat
 *  Description:-  Creates a JSON log format for file output
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  splat(),
  json()
);

const errorFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "14d",
  format: fileFormat,
  zippedArchive: true,
});

const combinedFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d",
  format: fileFormat,
  zippedArchive: true,
});

const logger = winston.createLogger({
  level: env.LOG_LEVEL || "info",
  defaultMeta: { service: env.APP_NAME || "TravelAgency" },
  transports: [
    errorFileTransport,
    combinedFileTransport,
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, "exceptions-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: fileFormat,
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, "rejections-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: fileFormat,
    }),
  ],
});

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

/*
 *  functionName:- stream
 *  Description:-  Provides a write stream interface for Morgan HTTP logger integration
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

module.exports = logger;
