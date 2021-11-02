import { Router } from "express";
import { check } from "express-validator";

import patientImagesController from "../controllers/patient-image-controller";

const patientImageRoutes = Router();

patientImageRoutes.patch(
  "/image",
  patientImagesController.savePatientImageLocally,
  check("id").not().isEmpty().withMessage("must not be empty"),
  patientImagesController.updatePatientImage
);

export default patientImageRoutes;
