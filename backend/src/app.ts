import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

// import { openAPIRouter } from "@/api-docs/openAPIRouter";

import { roomRouter } from "@/api/rooms/roomRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { guestRouter } from "./api/guests/guestRouter";
import { reservationRouter } from "./api/reservations/reservationRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/rooms", roomRouter);
app.use("/guests", guestRouter);
app.use("/reservations", reservationRouter);
// // Swagger UI
// app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
