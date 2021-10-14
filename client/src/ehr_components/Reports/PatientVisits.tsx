import { useState, useEffect } from "react";
import Axios from "axios";

export default function PatientVisits() {
  const [visitsList, setVisitsList] = useState([]);

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

      setVisitsList(visits);
    };

    getVisits();
  }, []);

  return <div>Patient visits</div>;
}
