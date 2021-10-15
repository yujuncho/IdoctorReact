import { useState, useEffect } from "react";
import Axios from "axios";

import BarChart from "./BarChart";

export default function Patients() {
  const [patientsList, setPatientsList] = useState<{ x: Date; y: number }[]>(
    []
  );
  const [totalNewPatients, setTotalNewPatients] = useState<number>(0);
  const title = `${totalNewPatients} new patients`;

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

      let mappedPatients: {
        [key: string]: number;
      } = {};
      for (let i = 0; i < patients.length; i++) {
        let patient = patients[i];
        let date = new Date(patient.createdAt);
        let formattedDate = date.toLocaleDateString("en-us", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        });

        if (mappedPatients[formattedDate] !== undefined) {
          mappedPatients[formattedDate] = mappedPatients[formattedDate] + 1;
        } else {
          mappedPatients[formattedDate] = 1;
        }
      }

      let resultList = [];
      let keys = Object.keys(mappedPatients);
      for (let i = 0; i < keys.length; i++) {
        resultList.push({
          x: new Date(keys[i]),
          y: Math.floor(mappedPatients[keys[i]])
        });
      }

      setPatientsList(resultList);
      setTotalNewPatients(0);
    };

    getPatients();
  }, []);

  const formatLabel = ({ datum }: { datum: any }) => {
    let formattedDate = new Date(datum.x).toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return `+${datum.y} on ${formattedDate}`;
  };

  return (
    <BarChart title={title} formatLabel={formatLabel} data={patientsList} />
  );
}
