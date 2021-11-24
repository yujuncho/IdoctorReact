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

    res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username || "",
      token: token,
      loginAt: newUser.loginAt,
      deactivated: newUser.isDeactivated
    });
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

    user.loginAt = new Date(Date.now());
    await user.save();

    let token = jwt.sign({ userId: user.id, email: user.email }, tokenSecret, {
      expiresIn: "1h"
    });

    res.json({
      userId: user.id,
      email: user.email,
      username: user.username || "",
      token: token,
      loginAt: user.loginAt,
      isDeactivated: user.isDeactivated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkAuth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("Invalid token");
    }
    let decodedToken = jwt.verify(token, tokenSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const authController = {
  signup,
  login,
  checkAuth
};

export default authController;
