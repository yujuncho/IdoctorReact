import { useState } from "react";
import Axios from "axios";

import ImageUpload from "./ui/ImageUpload";

interface PatientImageUploadProps {
  name: string;
  profileImage: string;
}

export default function PatientImageUpload(props: PatientImageUploadProps) {
  const { name, profileImage } = props;

  const [imgSrc, setImgSrc] = useState(profileImage);
  const [isLoading, setIsLoading] = useState(false);

  const pickedHandler = async (file: File) => {
    console.log(file);
    setIsLoading(true);

    try {
      let { data } = await Axios.get("/api/reports/patients");
      console.log(data);
      setImgSrc("");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <ImageUpload
      title={name}
      imgSrc={imgSrc}
      onPicked={pickedHandler}
      loading={isLoading}
    />
  );
}
