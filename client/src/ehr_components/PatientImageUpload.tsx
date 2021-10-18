import { useState } from "react";
import Axios from "axios";

import ImageUpload from "./ui/ImageUpload";

interface PatientImageUploadProps {
  id: string;
  name: string;
  profileImage: string;
}

export default function PatientImageUpload(props: PatientImageUploadProps) {
  const { id, name, profileImage } = props;

  const [imgSrc, setImgSrc] = useState(profileImage);
  const [isLoading, setIsLoading] = useState(false);

  const pickedHandler = async (file: File) => {
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("image", file);

      let {
        data: {
          patient: { profileImage }
        }
      } = await Axios.patch("/api/patient/image", formData);

      setImgSrc(profileImage);
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
