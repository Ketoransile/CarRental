import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./utils/auth";
import carRoute from "./routes/CarRoute";
import cookieParser from "cookie-parser";
import bookingRoute from "./routes/BookingRoute";
import { authenticatedUser } from "./middlewares/authenticatedUser";
const app = express();
const origins = ["http://localhost:3000"];
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

// Routes
app.use("/api/v1/car", carRoute);
app.use("/api/v1/booking", bookingRoute);

app.get("/", (req, res) => {
  console.log("HEllo World");
  res.send("HEllo WOrld");
});

app.listen(PORT, () => {
  console.log(`App is runnning on port ${PORT}`);
});
