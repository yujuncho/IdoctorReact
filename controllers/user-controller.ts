import UserModel from "../models/UserModel";
import { RequestHandler } from "express";
import { validationResult, ValidationError } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET || "local_secret";

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors
}: ValidationError) => {
  const formattedValue = value === undefined ? "" : `'${value}' `;
  return `${param} ${formattedValue}${msg}`;
};

const signup: RequestHandler = async (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  const { email, password } = req.body;
  try {
    let existingUser = await UserModel.findOne({ email });

    if (existingUser !== null) {
      return res.status(422).json({ error: "User already exists" });
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
    res.status(500).json({ error: error.message });
  }
};

const login: RequestHandler = async (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user === null) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    let token = jwt.sign({ userId: user.id, email: user.email }, tokenSecret, {
      expiresIn: "1h"
    });

    res.json({ userId: user.id, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userController = {
  signup,
  login
};

export default userController;
