import express from "express";
import userController from "../controllers/user-controller";

const userRoutes = express.Router();

userRoutes.get("/", userController.getUser);

userRoutes.post("/signup", userController.signup);

userRoutes.post("login", userController.login);

export default userRoutes;
