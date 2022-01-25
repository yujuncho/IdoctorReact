import React from "react";

interface AlertProps {
  message: string;
  alertType: string;
  onClose: () => void;
}

export default function Alert(props: AlertProps) {
  const { message, alertType, onClose } = props;

  return (
    <div
      className={`alert ${alertType} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="close"
        onClick={() => {
          onClose();
        }}
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
