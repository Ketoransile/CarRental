import { Router } from "express";
import { loginUser } from "../controller/AuthController";
const route = Router();

route.post("/login", loginUser);
export default route;
