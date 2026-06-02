/*
 *  FileName:-     connection.js
 *  Description:-  MongoDB connection with retry logic and event handlers
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { env } = require("../configs/envConfig");
const logger = require("../shareds/utils/logger");

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

let retryCount = 0;

/*
 *  functionName:- connectDB
 *  Description:-  Establishes MongoDB connection with retry mechanism
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
    connectTimeoutMS: 10000,
  };

  try {
    const uri =
      env.NODE_ENV === "test" ? env.MONGODB_TEST_URI : env.MONGODB_URI;

    logger.info(`Connecting to MongoDB [${env.NODE_ENV}]...`);

    await mongoose.connect(uri, options);

    retryCount = 0;
    logger.info("MongoDB connected successfully.");

    registerConnectionEvents();
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    await retryConnection();
  }
};

/*
 *  functionName:- retryConnection
 *  Description:-  Retries MongoDB connection after a delay up to MAX_RETRIES times
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const retryConnection = async () => {
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    logger.warn(
      `Retrying MongoDB connection (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY_MS / 1000}s...`
    );
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return connectDB();
  } else {
    logger.error(
      `Failed to connect to MongoDB after ${MAX_RETRIES} attempts. Exiting.`
    );
    process.exit(1);
  }
};

/*
 *  functionName:- registerConnectionEvents
 *  Description:-  Registers Mongoose connection event listeners
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const registerConnectionEvents = () => {
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connection established.");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`Mongoose connection error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected. Attempting reconnect...");
    if (env.NODE_ENV !== "test") {
      setTimeout(connectDB, RETRY_DELAY_MS);
    }
  });

  process.on("SIGINT", gracefulShutdown("SIGINT"));
  process.on("SIGTERM", gracefulShutdown("SIGTERM"));
};

/*
 *  functionName:- gracefulShutdown
 *  Description:-  Closes MongoDB connection gracefully on process termination
 *  Arguments:-    signal - process signal string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const gracefulShutdown = (signal) => async () => {
  logger.info(`${signal} received. Closing MongoDB connection...`);
  await mongoose.connection.close();
  logger.info("MongoDB connection closed. Exiting.");
  process.exit(0);
};

/*
 *  functionName:- getConnectionState
 *  Description:-  Returns current Mongoose connection state as string
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getConnectionState = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[mongoose.connection.readyState] || "unknown";
};

module.exports = { connectDB, getConnectionState };
