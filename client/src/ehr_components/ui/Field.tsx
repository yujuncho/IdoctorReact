export interface FieldProps {
  label: string;
  name: string;
  children: JSX.Element;
  gridSize?: string;
  required?: boolean;
  isFormRow?: boolean;
  fadeIn?: boolean;
}

const Field = (props: FieldProps) => {
  let { label, name, children, gridSize, required, isFormRow, fadeIn } = props;

  let fieldOrientation;
  let labelLength;
  let childrenLength;
  if (isFormRow) {
    fieldOrientation = "form-row";
    labelLength = "col-sm-4";
    childrenLength = "col-sm-8";
  } else {
    fieldOrientation = "form-group";
    labelLength = childrenLength = "w-100";
  }

  if (gridSize) childrenLength = gridSize;

  return (
    <div className={`${fieldOrientation} mb-4 ${fadeIn && "animated fadeIn"}`}>
      <label
        htmlFor={name}
        className={`${labelLength} col-form-label text-left`}
      >
        {required ? label + "*" : label}
      </label>
      <div className={`${childrenLength} text-left`}>{children}</div>
    </div>
  );
};

export default Field;
