import { useState, useEffect } from "react";
import Axios from "axios";

import BarChart from "./BarChart";

export default function Patients() {
  const [patientsList, setPatientsList] = useState();
  const title = "New Patients";

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING PATIENTS FOR REPORTS"
    );

    let getPatients = async () => {
      let {
        data: { newPatients }
      } = await Axios.get("/api/reports/patients");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED NEW PATIENTS REPORT",
        newPatients
      );

      setPatientsList(newPatients);
    };

    getPatients();
  }, []);

  return <BarChart title={title} data={patientsList} />;
}
