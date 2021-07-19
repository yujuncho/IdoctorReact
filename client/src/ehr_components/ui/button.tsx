export interface Prop {
  children: JSX.Element | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Prop) => {
  let { onClick, children } = props;

  return (
    <button type="button" className="bttn-custom" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
