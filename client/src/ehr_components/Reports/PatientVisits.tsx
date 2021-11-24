import { useState, useEffect } from "react";

import useAuthAxios from "../../hooks/useAuthAxios";
import BarChart from "./BarChart";

export default function PatientVisits() {
  const [visitsList, setVisitsList] = useState();
  const axios = useAuthAxios();
  const title = "New Visits";

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING VISITS FOR REPORTS"
    );

    let getVisits = async () => {
      let {
        data: { newVisits }
      } = await axios.get("/api/reports/visits");

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED NEW VISITS REPORT",
        newVisits
      );

      setVisitsList(newVisits);
    };

    getVisits();
  }, [axios]);

  return <BarChart title={title} data={visitsList} />;
}
