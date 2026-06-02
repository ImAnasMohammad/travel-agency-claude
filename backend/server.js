/*
 *  FileName:-     server.js
 *  Description:-  Express server with Socket.io, CORS, helmet, morgan, rate limiting, and all routes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const { env } = require("./configs/envConfig");
const { connectDB } = require("./databases/connection");
const logger = require("./shareds/utils/logger");
const { globalErrorHandler, notFoundHandler } = require("./shareds/utils/errorHandler");
const { globalRateLimiter } = require("./shareds/middlewares/rateLimitMiddleware");
const indexRoutes = require("./routes/indexRoutes");

const app = express();
const server = http.createServer(app);

/*
 *  functionName:- setupSocket
 *  Description:-  Initializes Socket.io with CORS and sets up connection events
 *  Arguments:-    httpServer - Node HTTP server
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN || env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      logger.info(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("booking_update", (data) => {
      io.to(`booking_${data.bookingId}`).emit("booking_status_changed", data);
    });

    socket.on("tracking_update", (data) => {
      io.to(`tracking_${data.bookingId}`).emit("location_updated", data);
    });

    socket.on("new_notification", (data) => {
      io.to(`user_${data.userId}`).emit("notification_received", data);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.id} (${reason})`);
    });

    socket.on("error", (err) => {
      logger.error(`Socket error for ${socket.id}: ${err.message}`);
    });
  });

  app.set("io", io);
  return io;
};

/*
 *  functionName:- setupMiddlewares
 *  Description:-  Registers all Express middlewares (helmet, cors, morgan, parsers, rate limit)
 *  Arguments:-    expressApp - Express application
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const setupMiddlewares = (expressApp) => {
  expressApp.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  expressApp.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          env.CLIENT_URL,
          "http://localhost:3000",
          "http://localhost:3001",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: Origin ${origin} not allowed`));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  expressApp.use(
    morgan("combined", { stream: logger.stream })
  );

  expressApp.use(globalRateLimiter);

  expressApp.use(express.json({ limit: "10mb" }));
  expressApp.use(express.urlencoded({ extended: true, limit: "10mb" }));

  expressApp.use(
    "/uploads",
    express.static(path.join(process.cwd(), env.UPLOAD_DIR))
  );

  expressApp.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });
};

/*
 *  functionName:- setupRoutes
 *  Description:-  Mounts all API routes under /api/v1 prefix
 *  Arguments:-    expressApp - Express application
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const setupRoutes = (expressApp) => {
  expressApp.use("/api/v1", indexRoutes);

  expressApp.use(notFoundHandler);
  expressApp.use(globalErrorHandler);
};

/*
 *  functionName:- startServer
 *  Description:-  Connects to MongoDB and starts Express HTTP server
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const startServer = async () => {
  try {
    await connectDB();

    setupMiddlewares(app);
    setupSocket(server);
    setupRoutes(app);

    server.listen(env.PORT, () => {
      logger.info(`Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    });

    process.on("uncaughtException", (error) => {
      logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
      process.exit(1);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

module.exports = { app, server };
