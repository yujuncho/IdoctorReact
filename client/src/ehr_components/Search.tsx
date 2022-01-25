import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

import SearchTable from "./SearchTable/";
import { Patient } from "./NewPatient";
import useAuthAxios from "../hooks/useAuthAxios";

const Search: React.FC = Props => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const history = useHistory();
  const axios = useAuthAxios();

  useEffect(() => {
    let getPatients = async () => {
      console.log(new Date(Date.now()).toISOString(), "FETCHING PATIENTS");

      try {
        let {
          data: { patients }
        } = await axios.get("/api/patient/all");

        console.log(
          new Date(Date.now()).toISOString(),
          "RETRIEVED PATIENTS",
          patients
        );

        setPatientsList(patients);
      } catch (error) {}
    };

    getPatients();
  }, [axios]);

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let { name: btnName } = e.target as HTMLInputElement;

    history.push({
      pathname: `/main/${btnName}`
    });
  };

  return (
    <Fragment>
      <div className="container pt-2">
        <button
          className="bttn-custom mb-5"
          name="newPatient"
          onClick={handleClick}
        >
          Add New Patient
        </button>
        <SearchTable patientsList={patientsList} />
      </div>
    </Fragment>
  );
};

export default Search;
