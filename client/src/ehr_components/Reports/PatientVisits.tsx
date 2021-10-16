import { useState, useEffect } from "react";
import Axios from "axios";

import BarChart from "./BarChart";

export default function PatientVisits() {
  const [visitsList, setVisitsList] = useState();
  const title = "New Visits";

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING VISITS FOR REPORTS"
    );

    let getVisits = async () => {
      let {
        data: { newVisits }
      } = await Axios.get("/api/reports/visits");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED NEW VISITS REPORT",
        newVisits
      );

      setVisitsList(newVisits);
    };

    getVisits();
  }, []);

  return <BarChart title={title} data={visitsList} />;
}
