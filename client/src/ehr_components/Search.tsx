import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import "react-bootstrap-typeahead/css/Typeahead.css";

import SearchTable from "./SearchTable/";
import { Patient } from "./NewPatient";

const Search: React.FC = Props => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const history = useHistory();

  useEffect(() => {
    console.log(new Date(Date.now()).toISOString(), "FETCHING PATIENTS");
    newPatientAdded();

    let nameList: any[] = [];
    let numberList: any[] = [];
    let DOBList: any[] = [];
    fetch("https://idoctorpwa-default-rtdb.firebaseio.com/patients.json")
      .then(response => response.json())
      .then(res => {
        let list: any[] = [];
        for (var id in res) {
          list.push(res[id]);
          if (res[id]?.fullName?.trim())
            nameList.push({
              label: res[id].fullName
            });

          if (res[id].dob?.trim()) DOBList.push({ label: res[id].dob });
          if (res[id].number?.trim())
            numberList.push({ label: res[id].number });
        }
        console.log(
          new Date(Date.now()).toISOString(),
          "RETRIEVED PATIENTS",
          list
        );
        setPatientsList(list);
      });
  }, []);

  let newPatientAdded = () => {
    console.log("Location Hash: ", window.location.hash);
    if (window.location.hash === "#success")
      toastr.success("New Patient", "Added Successfuly");
  };

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
