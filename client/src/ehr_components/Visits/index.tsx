import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

import VisitsList from "./VisitsList";
import VisitInfo from "./VisitInfo";
import { Patient } from "../NewPatient";
import { PatientVisit } from "../data/new-visit-fields";

export default function Visits() {
  const [isAnimating, setIsAnimating] = useState(0);
  const [visitsList, setVisitsList] = useState<PatientVisit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<PatientVisit>();
  let {
    state: { id: patientId }
  } = useLocation<Patient>();

  useEffect(() => {
    console.log(new Date(Date.now()).toISOString(), "FETCHING VISITS");

    let getVisits = async () => {
      let {
        data: { visits }
      } = await Axios.get(`/api/visits/patient/${patientId}`);

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED VISITS",
        visits
      );

      setVisitsList(visits);
      setSelectedVisit(visits[0]);
    };

    getVisits();
  }, [patientId]);

  let handleSelect = (id: string) => {
    let newSelectedVisit = visitsList.find(visit => visit.id === id);
    setIsAnimating(1);
    setSelectedVisit(newSelectedVisit);
  };

  return (
    <div className="container text-left mb-5">
      <h3 className="mb-3">Past Visits</h3>
      <div className="row">
        <VisitsList
          className="col-md-4 mb-4"
          visits={visitsList}
          selectedVisit={selectedVisit}
          onSelect={handleSelect}
        />
        <VisitInfo
          className="col-md-8 align-self-start"
          selectedVisit={selectedVisit}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      </div>
    </div>
  );
}
