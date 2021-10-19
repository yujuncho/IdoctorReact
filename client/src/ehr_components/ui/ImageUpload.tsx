import { useRef } from "react";

interface ImageUploadProps {
  title: string;
  imgSrc: string;
  onPicked: (file: File) => void;
  loading: boolean;
}

export default function ImageUpload(props: ImageUploadProps) {
  const { title, imgSrc, onPicked, loading } = props;

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      onPicked(event.target.files[0]);
    }
  };

  const updateImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className="card">
      {imgSrc.length > 0 && (
        <img
          className="card-img-top"
          style={{ objectFit: "cover", height: 200 }}
          src={imgSrc}
          alt="Patient"
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <input
          ref={filePickerRef}
          type="file"
          className="d-none"
          accept=".jpg,.jpeg,.png"
          onChange={pickedHandler}
        />
        <button className="btn btn-primary w-100" onClick={updateImageHandler}>
          {loading && <i className="fa fa-spinner fa-spin" />}
          {!loading && (imgSrc.length > 0 ? "Update Image" : "Upload Image")}
        </button>
      </div>
    </div>
  );
}
