import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import ImageUpload from "./ui/ImageUpload";
import { Patient } from "./NewPatient";

export default function PatientImageUpload() {
  let { state: patientState } = useLocation<Patient>();
  const { profileImage } = patientState;
  const [isLoading, setIsLoading] = useState(!!profileImage);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        let {
          data: { patientImage }
        } = await Axios.get(`/api/patient/image/${profileImage}`);

        setImgSrc(
          `data:${patientImage.contentType};base64,${patientImage.data}`
        );
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    profileImage && getImage();
  }, [profileImage]);

  const pickedHandler = async (file: File) => {
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("patientId", patientState.id || "");
      formData.append("image", file);

      let {
        data: { patientImage }
      } = await Axios.patch("/api/patient/image", formData);

      setImgSrc(`data:${patientImage.contentType};base64,${patientImage.data}`);
    } catch (error) {
      console.log(error);
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
