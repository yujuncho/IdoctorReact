import { RequestHandler } from "express";
import { Document } from "mongoose";
import { validationResult, ValidationError } from "express-validator";

import PatientModel, { IPatient } from "../models/PatientModel";

const getAllPatients: RequestHandler = async (req, res, next) => {
  let patients;

  try {
    patients = await PatientModel.find({});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json({
    patients: patients.map(patient => {
      return patient.toObject({ getters: true });
    })
  });
};

const createPatient: RequestHandler = async (req, res, next) => {
  const {
    fullName,
    dob,
    gender,
    phoneNumber,
    address,
    zipCode,
    maritalStatus,
    job = ""
  } = req.body;

  let createdPatient = new PatientModel({
    fullName,
    dob,
    gender,
    phoneNumber,
    address,
    zipCode,
    maritalStatus,
    job,
    history: {},
    visits: []
  });

  try {
    await createdPatient.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ patient: createdPatient.toObject({ getters: true }) });
};

const updateHistory: RequestHandler = async (req, res, next) => {
  const {
    patient,
    chronic_diseases = "",
    previous_admission = "",
    past_surgery = "",
    fractures = "",
    family_history = "",
    drug_allergy = "",
    chronic_drug_usage = "",
    smoking_status = "",
    alcohol = "",
    notes = ""
  } = req.body;

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

  foundPatient.history.chronic_diseases = chronic_diseases;
  foundPatient.history.previous_admission = previous_admission;
  foundPatient.history.past_surgery = past_surgery;
  foundPatient.history.fractures = fractures;
  foundPatient.history.family_history = family_history;
  foundPatient.history.drug_allergy = drug_allergy;
  foundPatient.history.chronic_drug_usage = chronic_drug_usage;
  foundPatient.history.smoking_status = smoking_status;
  foundPatient.history.alcohol = alcohol;
  foundPatient.history.notes = notes;

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    updatedPatient = await foundPatient.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json({ patient: updatedPatient });
};

const patientController = {
  getAllPatients,
  createPatient,
  updateHistory
};

export default patientController;
