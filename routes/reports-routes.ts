import { Router } from "express";

import reportsController from "../controllers/reports-controller";

let reportsRoutes = Router();

reportsRoutes.get("/patients", reportsController.getNewPatients);
reportsRoutes.get("/visits", reportsController.getNewVisits);

export default reportsRoutes;
