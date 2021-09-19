import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";

export default function ActionsCell<T extends Record<string, unknown>>(
  cell: React.PropsWithChildren<CellProps<T>>
) {
  let patient = useState(cell.data[cell.row.index].patient)[0];
  let visitsCount = patient.visits.length;
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
          disabled={visitsCount === 0}
          className={`btn btn-outline-${
            visitsCount === 0 ? "secondary" : "primary"
          }`}
          onClick={handleClick}
          name="visits"
        >
          {`${visitsCount} Past Visit${visitsCount === 1 ? "" : "s"}`}
        </button>
        <button
          className="btn btn-outline-primary ml-4"
          onClick={handleClick}
          name="newVisit"
        >
          New Visit
        </button>
        <button
          className="btn btn-outline-primary ml-4"
          onClick={handleClick}
          name="history"
        >
          Medical History
        </button>
      </div>
    </Fragment>
  );
}
