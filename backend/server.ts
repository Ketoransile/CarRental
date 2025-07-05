import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./utils/auth";
import carRoute from "./routes/CarRoute";
import cookieParser from "cookie-parser";
import bookingRoute from "./routes/BookingRoute";
import helmet from "helmet";
import authRoute from "./routes/authRoute";
import { authenticatedUser } from "./middlewares/authenticatedUser";
import { AppError, errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./config/db";
import { isAdmin } from "./middlewares/isAdmin";
const app = express();
const origins = ["http://localhost:3000, https://drivezy-frontend.vercel.app"];
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

// Routes
app.use("/api/v1/car", carRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/auths", authRoute);

app.get("/", (req, res) => {
  console.log("HEllo World");
  res.send("HEllo WOrld");
});
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });
app.get("*", (req, res) => {
  res.send("Hello World!");
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
