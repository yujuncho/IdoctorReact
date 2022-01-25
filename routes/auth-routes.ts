import { Router } from "express";
import authController from "../controllers/auth-controller";
import { check } from "express-validator";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty")
  ],
  authController.signup
);

authRoutes.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty")
  ],
  authController.login
);

export default authRoutes;
