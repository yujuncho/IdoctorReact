import React, { useMemo } from "react";
import { Column, Row, Cell, HeaderGroup } from "react-table";

import Table from "../ui/Table";

type SearchTableProps = {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

let columnWidths: { [char: string]: string } = {
  name: "col-5 col-md-3",
  dob: "col-3 col-md-2",
  phoneNumber: "col-4 col-md-2",
  actions: "col-12 col-md-5"
};
let columnStyles: { [char: string]: string } = {
  verticalAlign: "middle",
  textAlign: "left"
};

export default function SearchTable(props: SearchTableProps) {
  type TableData = {
    name: string;
    dob: string;
    phoneNumber: string;
    actions?: string;
  };

  let { onButtonClick } = props;

  const columns: Array<Column<TableData>> = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        className: columnWidths["name"],
        style: columnStyles
      },
      {
        Header: "Birth Date",
        accessor: "dob",
        className: columnWidths["dob"],
        style: columnStyles
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
        className: columnWidths["phoneNumber"],
        style: columnStyles
      },
      {
        Header: "",
        accessor: "actions",
        className: `${columnWidths["actions"]} align-self-stretch d-none d-md-block`,
        style: columnStyles,
        Cell: ({ value: initialValue, row: { index }, column: { id } }) => {
          return (
            <div className="text-left text-md-right">
              <button
                className="btn btn-outline-primary"
                onClick={onButtonClick}
                name="history"
              >
                Edit History
              </button>
              <button
                className="btn btn-outline-primary ml-4"
                onClick={onButtonClick}
                name="visit"
              >
                New Visit
              </button>
            </div>
          );
        }
      }
    ],
    [onButtonClick]
  );

  const data = useMemo(
    () => [
      {
        name: "Mark G",
        dob: "1960-12-1",
        phoneNumber: "913-182-1853"
      },
      {
        name: "Mark G",
        dob: "1960-12-1",
        phoneNumber: "913-182-1853"
      },
      {
        name: "Mark G",
        dob: "1960-12-1",
        phoneNumber: "913-182-1853"
      }
    ],
    []
  );

  return (
    <Table<TableData>
      data={data}
      columns={columns}
      getCellProps={(cell: Cell) => ({
        className: `${columnWidths[cell.column.id]} border-0 text-left`
      })}
      getRowProps={(row: Row) => ({
        className: "d-flex flex-wrap align-items-center border-top"
      })}
      getHeaderGroupProps={(headerGroup: HeaderGroup) => ({
        className: "d-flex flex-wrap align-items-center"
      })}
    />
  );
}
