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
const app = express();
const origins = [
  "http://localhost:3000",
  "https://drivezy-frontend.vercel.app",
];
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
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
