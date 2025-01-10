import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: parseInt(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS || "1000"),
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: parseInt(
    process.env.COMMON_RATE_LIMIT_WINDOW_MS || `${15 * 60 * 1000}`
  ),
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
