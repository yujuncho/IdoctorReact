import { Router } from "express";
import patientController from "../controllers/patient-controller";
import { check } from "express-validator";

const patientRoutes = Router();

patientRoutes.get("/all", patientController.getAllPatients);

patientRoutes.post("", patientController.createPatient);

patientRoutes.patch("/:patientId", patientController.updateHistory);

export default patientRoutes;
