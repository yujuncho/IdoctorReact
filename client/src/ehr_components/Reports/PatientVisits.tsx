import { useState, useEffect } from "react";
import Axios from "axios";

import BarChart from "./BarChart";

export default function PatientVisits() {
  const [visitsList, setVisitsList] = useState<{ x: Date; y: number }[]>([]);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const title = `${totalVisits} patient visits`;

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING VISITS FOR REPORTS"
    );

    let getVisits = async () => {
      let {
        data: { visits }
      } = await Axios.get("/api/visits/all");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED VISITS FOR REPORTS",
        visits
      );

      let mappedVisits: {
        [key: string]: number;
      } = {};
      for (let i = 0; i < visits.length; i++) {
        let patient = visits[i];
        let date = new Date(patient.createdAt);
        let formattedDate = date.toLocaleDateString("en-us", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        });

        if (mappedVisits[formattedDate] !== undefined) {
          mappedVisits[formattedDate] = mappedVisits[formattedDate] + 1;
        } else {
          mappedVisits[formattedDate] = 1;
        }
      }

      let resultList = [];
      let keys = Object.keys(mappedVisits);
      for (let i = 0; i < keys.length; i++) {
        resultList.push({
          x: new Date(keys[i]),
          y: Math.floor(mappedVisits[keys[i]])
        });
      }

      setVisitsList(resultList);
      setTotalVisits(0);
    };

    getVisits();
  }, []);

  const formatLabel = ({ datum }: { datum: any }) => {
    let formattedDate = new Date(datum.x).toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return `+${datum.y} on ${formattedDate}`;
  };

  return <BarChart title={title} formatLabel={formatLabel} data={visitsList} />;
}
