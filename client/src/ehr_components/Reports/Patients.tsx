import { useState, useEffect } from "react";

import useAuthAxios from "../../hooks/useAuthAxios";
import BarChart from "./BarChart";

export default function Patients() {
  const [patientsList, setPatientsList] = useState();
  const axios = useAuthAxios();
  const title = "New Patients";

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING PATIENTS FOR REPORTS"
    );

    let getPatients = async () => {
      let {
        data: { newPatients }
      } = await axios.get("/api/reports/patients");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED NEW PATIENTS REPORT",
        newPatients
      );

      setPatientsList(newPatients);
    };

    getPatients();
  }, [axios]);

  return <BarChart title={title} data={patientsList} />;
}
