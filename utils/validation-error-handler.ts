import { Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors
}: ValidationError) => {
  const formattedValue =
    value === undefined || value.length === 0 ? "" : `'${value}' `;
  return `${param} ${formattedValue}${msg}`;
};

const validationErrorHandler = (req: Request, res: Response) => {
  const result = validationResult(req).formatWith(errorFormatter);

  if (result.isEmpty()) {
    return null;
  } else {
    return res.status(422).json({ errors: result.array() });
  }
};

export default validationErrorHandler;
