import { Router } from "express";
import userController from "../controllers/user-controller";
import { check } from "express-validator";

const userRoutes = Router();

userRoutes.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty")
  ],
  userController.signup
);

userRoutes.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("must not be empty"),
    check("password").not().isEmpty().withMessage("must not be empty")
  ],
  userController.login
);

export default userRoutes;
