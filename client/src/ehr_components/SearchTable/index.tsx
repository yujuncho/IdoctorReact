import { useMemo } from "react";
import { Column, Row, Cell, HeaderGroup } from "react-table";

import Table from "../ui/Table";
import { Patient } from "../NewPatient";
import ActionsCell from "./ActionsCell";
import FiltersGroup from "./FiltersGroup";
import { columnStyles, columnWidths } from "./styles";

type SearchTableProps = {
  patientsList: Patient[];
};

type TableData = {
  fullName: string;
  dob: string;
  phoneNumber: string;
  actions?: string;
  patient?: object;
};

export default function SearchTable(props: SearchTableProps) {
  let { patientsList } = props;

  const columns: Array<Column<TableData>> = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        get className(): string {
          return columnWidths[this.accessor];
        },
        style: columnStyles,
        filter: "fuzzyText"
      },
      {
        Header: "Birth Date",
        accessor: "dob",
        get className(): string {
          return columnWidths[this.accessor];
        },
        style: columnStyles,
        filter: "fuzzyText"
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
        get className(): string {
          return columnWidths[this.accessor];
        },
        style: columnStyles,
        filter: "fuzzyText"
      },
      {
        Header: "",
        accessor: "actions",
        get className(): string {
          return `${columnWidths["actions"]} align-self-stretch d-none d-md-block`;
        },
        style: columnStyles,
        disableFilters: true,
        disableSortBy: true,
        Cell: ActionsCell
      }
    ],
    []
  );

  const data = useMemo(() => {
    return patientsList.map(patient => {
      let { fullName, dob, phoneNumber } = patient;
      return { fullName, dob, phoneNumber, patient };
    });
  }, [patientsList]);

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
      headerProps={{
        className: "bg-white",
        style: {
          boxShadow: "inset 0px 0px #000, 0 1px #000",
          position: "sticky",
          top: "0",
          zIndex: "1"
        }
      }}
      getHeaderGroupProps={(headerGroup: HeaderGroup) => ({
        className: "d-flex flex-wrap align-items-center"
      })}
      showOnFilter={true}
      FiltersGroup={FiltersGroup}
    />
  );
}
