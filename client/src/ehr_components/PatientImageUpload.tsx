import { useState } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import ImageUpload from "./ui/ImageUpload";
import { Patient } from "./NewPatient";

export default function PatientImageUpload() {
  let { pathname, state: patientState } = useLocation<Patient>();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const pickedHandler = async (file: File) => {
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("id", patientState.id || "");
      formData.append("image", file);

      let {
        data: {
          patient: { profileImage }
        }
      } = await Axios.patch("/api/patient/image", formData);

      history.replace(pathname, { ...patientState, profileImage });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <ImageUpload
      title={patientState.fullName}
      imgSrc={patientState.profileImage || ""}
      onPicked={pickedHandler}
      loading={isLoading}
    />
  );
}
