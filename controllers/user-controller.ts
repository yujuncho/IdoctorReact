import UserModel from "../models/UserModel";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validationErrorHandler from "../utils/validation-error-handler";

const tokenSecret = process.env.JWT_SECRET || "local_secret";

const signup: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { email, password } = req.body;
  try {
    let existingUser = await UserModel.findOne({ email });

    if (existingUser !== null) {
      return res.status(422).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    let newUser = await UserModel.create({ email, password: hashedPassword });

    let token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      tokenSecret,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ userId: newUser.id, email: newUser.email, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user === null) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    let token = jwt.sign({ userId: user.id, email: user.email }, tokenSecret, {
      expiresIn: "1h"
    });

    res.json({ userId: user.id, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userController = {
  signup,
  login
};

export default userController;
