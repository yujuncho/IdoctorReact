import { Router } from "express";
import { check } from "express-validator";

import patientImagesController from "../controllers/patient-image-controller";

const patientImageRoutes = Router();

patientImageRoutes.get(
  "/image/:imageId",
  patientImagesController.getPatientImage
);

patientImageRoutes.patch(
  "/image",
  patientImagesController.savePatientImageLocally,
  check("patientId").not().isEmpty().withMessage("must not be empty"),
  patientImagesController.updatePatientImage
);

export default patientImageRoutes;
