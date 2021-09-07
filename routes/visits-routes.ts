import { Router } from "express";
import visitsController from "../controllers/visits-controller";
import { check } from "express-validator";

const visitsRoutes = Router();

visitsRoutes.get("/patient/:patientId", visitsController.getVisitsByPatientId);

visitsRoutes.post("/", visitsController.createVisit);

export default visitsRoutes;
