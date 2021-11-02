import path from "path";
import fs from "fs";
import { RequestHandler } from "express";
import { Document, startSession } from "mongoose";
import multer from "multer";

import PatientModel, { IPatient } from "../models/PatientModel";
import PatientImageModel, { IPatientImage } from "../models/PatientImageModel";
import fileUpload from "../middleware/file-upload";
import validationErrorHandler from "../utils/validation-error-handler";
import imageUploadRollback from "../utils/image-upload-rollback";

const savePatientImageLocally: RequestHandler = async (req, res, next) => {
  const upload = fileUpload.single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(422).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    return next();
  });
};

const updatePatientImage: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { id } = req.body;

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  let patientImage: (IPatientImage & Document<any, any, IPatientImage>) | null;
  try {
    foundPatient = await PatientModel.findById(id);
    patientImage = await PatientImageModel.findOne({ patient: id });
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

  if (!patientImage) {
    patientImage = new PatientImageModel({
      patient: id
    });
  }

  const imagePath = path.join(
    __dirname + "/uploads/images" + req.file?.filename
  );
  const imageData = fs.readFileSync(imagePath);
  patientImage.img.data = imageData;
  patientImage.img.contentType = req.file?.mimetype || "";
  patientImage.filename = req.file?.fieldname || "";

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  let updatedPatientImage:
    | (IPatientImage & Document<any, any, IPatientImage>)
    | null;
  try {
    const sess = await startSession();
    sess.startTransaction();
    updatedPatientImage = await patientImage.save();
    foundPatient.profileImage = patientImage.id;
    updatedPatient = await foundPatient.save();
    sess.commitTransaction();
  } catch (error) {
    imageUploadRollback(req);
    return res.status(500).json({ message: error.message });
  }

  imageUploadRollback(req);
  res.json({ patient: updatedPatient, patientImage: updatedPatientImage });
};

const patientImageController = {
  savePatientImageLocally,
  updatePatientImage
};

export default patientImageController;
