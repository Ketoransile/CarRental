import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
// import { auth } from "utils/auth";
import carRoute from "./routes/CarRoute.js";
import cookieParser from "cookie-parser";
import bookingRoute from "./routes/BookingRoute.js";
import helmet from "helmet";
import authRoute from "./routes/authRoute.js";
import { authenticatedUser } from "./middlewares/authenticatedUser.js";
import { AppError, errorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.js";
import { isAdmin } from "./middlewares/isAdmin.js";
import { auth } from "./utils/auth.js";
import { rateLimit } from "express-rate-limit";
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
const origins = [
  "http://localhost:3000",
  "https://drivezy-frontend.vercel.app",
  "https://drivezy-car-rental.vercel.app",
];
const PORT = process.env.PORT || 5000; // Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(cookieParser());
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "https:", "'unsafe-inline'"],
        objectSrc: ["'none'"],
      },
    },
  })
);

app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

// Routes
app.use("/api/v1/car", carRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/auths", authRoute);
app.get("/", (req, res) => {
  res.json({ status: "running", timestamp: new Date() });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(); // 👈 Call once here
    app.listen(PORT, () => {
      console.log(`App is runnning on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
  }
};

startServer();
