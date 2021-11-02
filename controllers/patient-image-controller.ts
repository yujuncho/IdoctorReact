import path from "path";
import fs from "fs";
import { RequestHandler } from "express";
import mongoose, { Document } from "mongoose";
import multer from "multer";

import PatientModel, { IPatient } from "../models/PatientModel";
import PatientImageModel, { IPatientImage } from "../models/PatientImageModel";
import fileUpload from "../middleware/file-upload";
import validationErrorHandler from "../utils/validation-error-handler";
import imageUploadRollback from "../utils/image-upload-rollback";

const getPatientImage: RequestHandler = async (req, res, next) => {
  let imageId = req.params.imageId;

  let foundPatientImage:
    | (IPatientImage & Document<any, any, IPatientImage>)
    | null;
  try {
    foundPatientImage = await PatientImageModel.findById(imageId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatientImage) {
    return res.status(404).json({
      message: "Could not find patientImage for given patientImage ID"
    });
  }

  res.json({ patientImage: foundPatientImage });
};

const savePatientImageLocally: RequestHandler = async (req, res, next) => {
  const upload = fileUpload.single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      let message = err.message;
      if (err.message === "File too large") {
        message = "Please choose an image less than 16 MB";
      }
      return res.status(422).json({ message });
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

  const { patientId } = req.body;

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  let patientImage: (IPatientImage & Document<any, any, IPatientImage>) | null;
  try {
    foundPatient = await PatientModel.findById(patientId);
    patientImage = await PatientImageModel.findOne({ patient: patientId });
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
      patient: patientId
    });
  }

  const imagePath = path.join(
    __dirname,
    "../uploads/images",
    req.file?.filename || ""
  );
  const imageData = fs.readFileSync(imagePath);
  patientImage.data = imageData.toString("base64");
  patientImage.contentType = req.file?.mimetype || "";
  patientImage.filename = req.file?.fieldname || "";

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  let updatedPatientImage:
    | (IPatientImage & Document<any, any, IPatientImage>)
    | null;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    updatedPatientImage = await patientImage.save();
    foundPatient.profileImage = updatedPatientImage.id;
    updatedPatient = await foundPatient.save();
    sess.commitTransaction();
  } catch (error) {
    imageUploadRollback(req);
    return res.status(500).json({ message: error.message });
  }

  imageUploadRollback(req);
  res.json({ patientImage: updatedPatientImage });
};

const patientImageController = {
  getPatientImage,
  savePatientImageLocally,
  updatePatientImage
};

export default patientImageController;
