import { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { useHistory, useLocation } from "react-router-dom";

import useAuthAxios from "../hooks/useAuthAxios";
import ImageUpload from "./ui/ImageUpload";
import { Patient } from "./NewPatient";

export default function PatientImageUpload() {
  let { pathname, state: patientState } = useLocation<Patient>();
  const { profileImage } = patientState;
  const [isLoading, setIsLoading] = useState(!!profileImage);
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();
  const axios = useAuthAxios();

  useEffect(() => {
    const getImage = async () => {
      try {
        let {
          data: { patientImage }
        } = await axios.get(`/api/patient/image/${profileImage}`);

        setImgSrc(
          `data:${patientImage.contentType};base64,${patientImage.data}`
        );
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    profileImage && getImage();
  }, [profileImage, axios]);

  const pickedHandler = async (file: File) => {
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("patientId", patientState.id || "");
      formData.append("image", file);

      let {
        data: { patientImage }
      } = await axios.patch("/api/patient/image", formData);

      setImgSrc(`data:${patientImage.contentType};base64,${patientImage.data}`);
      history.replace(pathname, {
        ...patientState,
        patientImage: patientImage.id
      });
    } catch (error: any) {
      let message;
      if (error.response) {
        if (error.response.data.errors) {
          let errors = error.response.data.errors as string[];
          message = errors.join(". ");
        } else {
          message = error.response.data.message;
        }
      } else {
        message = error.message;
      }
      toastr.error("New Patient", message);
    }

    setIsLoading(false);
  };

  return (
    <ImageUpload
      title={patientState.fullName}
      imgSrc={imgSrc}
      onPicked={pickedHandler}
      loading={isLoading}
    />
  );
}
