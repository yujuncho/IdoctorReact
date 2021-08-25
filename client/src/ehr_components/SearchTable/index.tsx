import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Column, Row, Cell, HeaderGroup } from "react-table";

import Table from "../ui/Table";
import { Patient } from "../NewPatient";
import ActionsCell from "./ActionsCell";

type SearchTableProps = {
  patientsList: Patient[];
};

type TableData = {
  name: string;
  dob: string;
  phoneNumber: string;
  actions?: string;
  patient?: object;
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
  let { patientsList } = props;

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
        Cell: ActionsCell
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      patientsList.map(patient => {
        let { fullName: name, dob, phoneNumber } = patient;
        return { name, dob, phoneNumber, patient };
      }),
    [patientsList]
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
