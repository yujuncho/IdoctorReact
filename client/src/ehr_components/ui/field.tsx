export interface Prop {
  label: string;
  name: string;
  children: JSX.Element;
  gridSize?: string;
}

const Field = (props: Prop) => {
  let { label, name, children, gridSize } = props;

  return (
    <div className="mb-4 row">
      <label htmlFor={name} className="col-sm-4 col-form-label text-left">
        {label}
      </label>
      <div className={`${gridSize ? gridSize : "col-sm-8"} text-left d-flex`}>
        {children}
      </div>
    </div>
  );
};

export default Field;
