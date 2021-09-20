import { Types, Schema, model, Document } from "mongoose";

export interface IPatientHistory {
  chronic_diseases?: string;
  previous_admission?: string;
  past_surgery?: string;
  fractures?: string;
  family_history?: string;
  drug_allergy?: string;
  chronic_drug_usage?: string;
  smoking_status?: string;
  alcohol?: string;
  notes?: string;
}

export const patientHistorySchema = new Schema({
  chronic_diseases: { type: String },
  previous_admission: { type: String },
  past_surgery: { type: String },
  fractures: { type: String },
  family_history: { type: String },
  drug_allergy: { type: String },
  chronic_drug_usage: { type: String },
  smoking_status: { type: String },
  alcohol: { type: String },
  notes: { type: String }
});

export interface IPatient {
  fullName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  maritalStatus: string;
  job?: string;
  history: IPatientHistory;
  visits: Types.ObjectId[] | Document[];
}

const patientSchema = new Schema<IPatient>({
  fullName: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  job: {
    type: String
  },
  history: patientHistorySchema,
  visits: [{ type: Types.ObjectId, required: true, ref: "PatientVisit" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PatientModel = model<IPatient>("Patient", patientSchema);

export default PatientModel;
