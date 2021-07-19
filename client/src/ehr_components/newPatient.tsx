import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Axios from "axios";

export interface NewPatientProps {
  added: Function;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dob: "",
    address: "",
    job: "",
    gender: "",
    history: {
      note: ""
    },
    maritialStatus: "",
    number: ""
  });

  const firebaseURl =
    "https://idoctorpwa-default-rtdb.firebaseio.com/patients.json";

  const updateFormData = (event: any) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  let handleClick = async () => {
    console.log(formData);

    try {
      var callResults = await Axios.post(firebaseURl, formData);
      history.push(`/main/search#success`);
    } catch (error) {
      toastr.error("New Painent", error.message);
    }

    // fetch("https://idoctorpwa-default-rtdb.firebaseio.com/patients.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify(formData)
    // })
    //   .then(function (res) {
    //     console.log("Sent data", res);
    //   })
    //   .catch(function (err) {
    //     console.log("Error while sending data", err);
    //   });
  };

  const {
    fullName,
    age,
    dob,
    address,
    job,
    gender,
    maritialStatus,
    number
  } = formData;

  return (
    <div className="container">
      <h2>New Patient</h2>
      <br />
      <div className="row  justify-content-center">
        <form className="w-75   align-content-center">
          <div className="form-group">
            <input
              type="text"
              value={fullName}
              className="form-control"
              id="full_name_id"
              name="fullName"
              placeholder=" Full Name"
              onChange={e => updateFormData(e)}
            />
          </div>
          <div className="form-group ">
            <div className="row">
              <div className="col-3">
                <input
                  value={age}
                  type="text"
                  className="form-control"
                  id="street1_id"
                  name="age"
                  placeholder="Age"
                  onChange={e => updateFormData(e)}
                />
              </div>

              <div className="col-4 ">
                <label
                  className="form-control text-right "
                  style={{ border: "none" }}
                >
                  Date of Birth
                </label>
              </div>
              <div className="col-5 ">
                <input
                  value={dob}
                  type="date"
                  className="form-control"
                  id="DOB"
                  name="dob"
                  onChange={e => updateFormData(e)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              value={address}
              type="text"
              className="form-control"
              id="street1_id"
              name="address"
              placeholder="Address"
              onChange={e => updateFormData(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="street1_id"
              name="job"
              placeholder="Job"
              onChange={e => updateFormData(e)}
            />
          </div>

          <div className="  float-left pl-1 pb-2">
            <div className="form-check form-check-inline ">
              <input
                className="form-check-input p-5"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value={gender}
                onChange={e => updateFormData(e)}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value={gender}
                onChange={e => updateFormData(e)}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value={gender}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Intersex
              </label>
            </div>
          </div>

          <div className="form-group">
            <select
              className="form-control"
              id="state_id"
              value={maritialStatus}
              onChange={e => updateFormData(e)}
            >
              <option value="" disabled hidden>
                Marital Status
              </option>
              <option value="S">Single</option>
              <option value="M">Married</option>
              <option value="D">Divorced</option>
              <option value="W">Windower</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="zip_id"
              name="number"
              //value={number}
              placeholder="Phone Number"
              onChange={e => updateFormData(e)}
            />
          </div>

          <div className="form-group">
            <button type="button" className="bttn-custom" onClick={handleClick}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatient;
