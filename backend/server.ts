import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./utils/auth";
const app = express();
const origins = ["http://localhost:3000"];
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.get("/", (req, res) => {
  console.log("HEllo World");
  res.send("HEllo WOrld");
});

app.listen(PORT, () => {
  console.log(`App is runnning on port ${PORT}`);
});
