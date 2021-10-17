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
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty")
  ],
  userController.login
);

userRoutes.patch(
  "/",
  check("id").not().isEmpty().withMessage("must not be empty"),
  userController.updateUser
);

userRoutes.patch(
  "/password",
  [
    check("id").not().isEmpty().withMessage("must not be empty"),
    check("currentPassword").not().isEmpty().withMessage("must not be empty"),
    check("newPassword").not().isEmpty().withMessage("must not be empty")
  ],
  userController.updatePassword
);

userRoutes.patch(
  "/activate",
  [
    check("id").not().isEmpty().withMessage("must not be empty"),
    check("deactivate").isBoolean().withMessage("must be a boolean")
  ],
  userController.updateActiveStatus
);

export default userRoutes;
