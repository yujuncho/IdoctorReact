import { RequestHandler } from "express";
import { Document } from "mongoose";

import PatientModel, { IPatient } from "../models/PatientModel";
import validationErrorHandler from "../utils/validation-error-handler";
import imageUploadRollback from "../utils/image-upload-rollback";

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
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

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

  res.status(201).json({ patient: createdPatient.toObject({ getters: true }) });
};

const updateHistory: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const {
    patient,
    chronic_diseases,
    previous_admission,
    previous_admission_description,
    past_surgery,
    past_surgery_description,
    fractures,
    family_history,
    drug_allergy,
    drug_allergy_description,
    chronic_drug_usage,
    blood_group,
    smoking_status,
    alcohol,
    notes
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

  if (chronic_diseases !== undefined)
    foundPatient.history.chronic_diseases = chronic_diseases;
  if (previous_admission !== undefined)
    foundPatient.history.previous_admission = previous_admission;
  if (previous_admission_description !== undefined)
    foundPatient.history.previous_admission_description =
      previous_admission_description;
  if (past_surgery !== undefined)
    foundPatient.history.past_surgery = past_surgery;
  if (past_surgery_description !== undefined)
    foundPatient.history.past_surgery_description = past_surgery_description;
  if (fractures !== undefined) foundPatient.history.fractures = fractures;
  if (family_history !== undefined)
    foundPatient.history.family_history = family_history;
  if (drug_allergy !== undefined)
    foundPatient.history.drug_allergy = drug_allergy;
  if (drug_allergy_description !== undefined)
    foundPatient.history.drug_allergy_description = drug_allergy_description;
  if (chronic_drug_usage !== undefined)
    foundPatient.history.chronic_drug_usage = chronic_drug_usage;
  if (blood_group !== undefined) foundPatient.history.blood_group = blood_group;
  if (smoking_status !== undefined)
    foundPatient.history.smoking_status = smoking_status;
  if (alcohol !== undefined) foundPatient.history.alcohol = alcohol;
  if (notes !== undefined) foundPatient.history.notes = notes;

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    updatedPatient = await foundPatient.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ patient: updatedPatient });
};

const updatePatientImage: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { id } = req.body;

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    foundPatient = await PatientModel.findById(id);
  } catch (error) {
    imageUploadRollback(req);
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatient) {
    imageUploadRollback(req);
    return res
      .status(404)
      .json({ message: "Could not find patient for given patient ID" });
  }

  foundPatient.profileImage = req.file?.path;

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    updatedPatient = await foundPatient.save();
  } catch (error) {
    imageUploadRollback(req);
    return res.status(500).json({ message: error.message });
  }

  res.json({ patient: updatedPatient });
};

const patientController = {
  getAllPatients,
  createPatient,
  updateHistory,
  updatePatientImage
};

export default patientController;
