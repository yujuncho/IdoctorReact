import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import useAuthAxios from "../../hooks/useAuthAxios";
import VisitsList from "./VisitsList";
import VisitInfo from "./VisitInfo";
import { Patient } from "../NewPatient";
import { PatientVisit } from "../data/new-visit-fields";

export default function Visits() {
  const [isAnimating, setIsAnimating] = useState(0);
  const [visitsList, setVisitsList] = useState<PatientVisit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<PatientVisit>();
  let axios = useAuthAxios();
  let history = useHistory();
  let { state: patientState } = useLocation<Patient>();
  let patientId = patientState && patientState.id ? patientState.id : "";

  useEffect(() => {
    console.log(new Date(Date.now()).toISOString(), "FETCHING VISITS");

    if (patientId.length === 0) return;

    let getVisits = async () => {
      let {
        data: { visits }
      } = await axios.get(`/api/visits/patient/${patientId}`);

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED VISITS",
        visits
      );

      setVisitsList(visits);
      setSelectedVisit(visits[0]);
    };

    getVisits();
  }, [patientId, axios]);

  let handleSelect = (id: string) => {
    let newSelectedVisit = visitsList.find(visit => visit.id === id);
    setIsAnimating(1);
    setSelectedVisit(newSelectedVisit);
  };

  if (patientState === undefined) {
    history.push("/main/search");
    return <></>;
  }

  return (
    <div className="container text-left mb-5">
      <h3 className="mb-4">Past Visits for {patientState.fullName}</h3>
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
