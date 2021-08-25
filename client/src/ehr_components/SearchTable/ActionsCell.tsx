import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";

export default function ActionsCell<T extends Record<string, unknown>>(
  cell: React.PropsWithChildren<CellProps<T>>
) {
  let [patient, setPatient] = useState(cell.data[cell.row.index].patient);
  const history = useHistory();

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let { name: btnName } = e.target as HTMLInputElement;

    history.push({
      pathname: `/main/${btnName}`,
      state: patient
    });
  };

  return (
    <Fragment>
      <div className="text-left text-md-right">
        <button
          className="btn btn-outline-primary"
          onClick={handleClick}
          name="history"
        >
          Edit History
        </button>
        <button
          className="btn btn-outline-primary ml-4"
          onClick={handleClick}
          name="visit"
        >
          New Visit
        </button>
      </div>
    </Fragment>
  );
}
