import { Router } from "express";
import visitsController from "../controllers/visits-controller";
import { check } from "express-validator";

const visitsRoutes = Router();

visitsRoutes.get("/patient/:patientId", visitsController.getVisitsByPatientId);

visitsRoutes.post(
  "/",
  [
    check("patient").not().isEmpty().withMessage("must not be empty"),
    check("date").isDate().withMessage("is an invalid date")
  ],
  visitsController.createVisit
);

export default visitsRoutes;
