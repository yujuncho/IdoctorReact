import { useState, useEffect } from "react";
import Axios from "axios";

import { Patient } from "../NewPatient";

export default function Patients() {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING PATIENTS FOR REPORTS"
    );

    let getPatients = async () => {
      let {
        data: { patients }
      } = await Axios.get("/api/patient/all");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED PATIENTS FOR REPORTS",
        patients
      );

      setPatientsList(patients);
    };

    getPatients();
  }, []);

  return <div>New patients</div>;
}
