import { Router } from "express";
import { check } from "express-validator";

import patientController from "../controllers/patient-controller";
import fileUpload from "../middleware/file-upload";

const patientRoutes = Router();

patientRoutes.get("/all", patientController.getAllPatients);

patientRoutes.post(
  "",
  [
    check("fullName").not().isEmpty().withMessage("must not be empty"),
    check("dob").isDate().withMessage("is an invalid date format"),
    check("gender").not().isEmpty().withMessage("must not be empty"),
    check("phoneNumber")
      .isMobilePhone("en-US")
      .withMessage("is an invalid US phone number"),
    check("address").not().isEmpty().withMessage("must not be empty"),
    check("zipCode")
      .isPostalCode("US")
      .withMessage("is an invalid US postal code"),
    check("maritalStatus")
      .isAlphanumeric("en-US")
      .withMessage("must only contain US alphanumeric characters")
      .isLength({ min: 1, max: 1 })
      .withMessage("must only contain 1 character")
  ],
  patientController.createPatient
);

patientRoutes.patch(
  "/history",
  check("patient").not().isEmpty().withMessage("must not be empty"),
  patientController.updateHistory
);

patientRoutes.patch(
  "/image",
  fileUpload.single("image"),
  check("id").not().isEmpty().withMessage("must not be empty"),
  patientController.updatePatientImage
);

export default patientRoutes;
