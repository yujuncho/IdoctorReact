import { RequestHandler } from "express";
import { Document, startSession } from "mongoose";
import { validationResult, ValidationError } from "express-validator";

import PatientModel, { IPatient } from "../models/PatientModel";
import PatientVisitModel from "../models/PatientVisitModel";

const getVisitsByPatientId: RequestHandler = async (req, res, next) => {
  let patientId = req.params.patientId;

  let patientWithVisits;
  try {
    patientWithVisits = await PatientModel.findById(patientId).populate(
      "visits"
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!patientWithVisits || patientWithVisits.visits.length === 0) {
    return res
      .status(404)
      .json({ message: "Could not find visits for the provided patient ID" });
  }

  res.json({
    visits: patientWithVisits.visits.map(visit => {
      let visitDocument = visit as Document;
      return visitDocument.toObject({ getters: true });
    })
  });
};

const createVisit: RequestHandler = async (req, res, next) => {
  const {
    patient,
    date,
    complaint = "",
    present_illness_history = "",
    other_system_review = "",
    bp_dia = "",
    bp_sys = "",
    pulse_rate = "",
    temperature = "",
    respiratory_rate = "",
    spo2 = "",
    weight = "",
    height = "",
    bmi = "",
    lab_investigation = "",
    diagnosis = "",
    treatment = "",
    is_free = "",
    is_review = "",
    is_referred = "",
    cost = "",
    notes = ""
  } = req.body;

  let createdVisit = new PatientVisitModel({
    patient,
    date,
    complaint,
    present_illness_history,
    other_system_review,
    bp_dia,
    bp_sys,
    pulse_rate,
    temperature,
    respiratory_rate,
    spo2,
    weight,
    height,
    bmi,
    lab_investigation,
    diagnosis,
    treatment,
    is_free,
    is_review,
    is_referred,
    cost,
    notes
  });

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    foundPatient = await PatientModel.findById(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatient) {
    return res
      .status(404)
      .json({ message: "Could not find patient for given patient ID" });
  }

  try {
    const sess = await startSession();
    sess.startTransaction();
    await createdVisit.save();
    foundPatient.visits.push(createdVisit.id);
    await foundPatient.save();
    sess.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ visit: createdVisit.toObject({ getters: true }) });
};

const visitsController = {
  getVisitsByPatientId,
  createVisit
};

export default visitsController;
