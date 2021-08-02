import UserModel, { IUser } from "../models/UserModel";
import { RequestHandler } from "express";

const getUser: RequestHandler = (req, res, next) => {
  console.log("Get request in users");
  res.json({ message: "it works!" });
};

const signup: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  const createdUser: IUser = {
    email,
    password
  };

  // Save to MongoDB

  res.status(201).json({ user: createdUser });
};

const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser: IUser = {
    email,
    password
  };

  // Authenticate user

  res.json({ message: "Logged in!" });
};

const userController = {
  getUser,
  signup,
  login
};

export default userController;
