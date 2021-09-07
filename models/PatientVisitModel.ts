import mongoose, { Schema, model } from "mongoose";

export interface IPatientVisit {
  patient: mongoose.Types.ObjectId;
  date: string;
  complaint: string;
  present_illness_history?: string;
  other_system_review?: string;
  bp_dia?: string;
  bp_sys?: string;
  pulse_rate?: string;
  temperature?: string;
  respiratory_rate?: string;
  spo2?: string;
  weight?: string;
  height?: string;
  bmi?: string;
  lab_investigation?: string;
  diagnosis?: string;
  treatment?: string;
  is_free?: string;
  is_review?: string;
  is_referred?: string;
  cost?: string;
  notes?: string;
}

const patientVisitSchema = new Schema<IPatientVisit>({
  patient: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  date: {
    type: String,
    required: true
  },
  complaint: {
    type: String,
    required: true
  },
  present_illness_history: { type: String },
  other_system_review: { type: String },
  bp_dia: { type: String },
  bp_sys: { type: String },
  pulse_rate: { type: String },
  temperature: { type: String },
  respiratory_rate: { type: String },
  spo2: { type: String },
  weight: { type: String },
  height: { type: String },
  bmi: { type: String },
  lab_investigation: { type: String },
  diagnosis: { type: String },
  treatment: { type: String },
  is_free: { type: String },
  is_review: { type: String },
  is_referred: { type: String },
  cost: { type: String },
  notes: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PatientVisitModel = model<IPatientVisit>(
  "PatientVisit",
  patientVisitSchema
);

export default PatientVisitModel;
