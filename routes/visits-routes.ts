import { Router } from "express";
import visitsController from "../controllers/visits-controller";
import { check } from "express-validator";

const visitsRoutes = Router();

visitsRoutes.get("/all", visitsController.getAllVisits);

visitsRoutes.get("/patient/:patientId", visitsController.getVisitsByPatientId);

visitsRoutes.post(
  "/",
  [
    check("patient").not().isEmpty().withMessage("must not be empty"),
    check("date").isDate().withMessage("is an invalid date"),
    check("complaint").not().isEmpty().withMessage("must not be empty")
  ],
  visitsController.createVisit
);

export default visitsRoutes;
