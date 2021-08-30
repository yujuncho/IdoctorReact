import { useMemo, ReactElement, PropsWithChildren, ElementType } from "react";
import {
  useTable,
  TableOptions,
  HeaderGroup,
  Column,
  useFilters
} from "react-table";

import DefaultColumnFilter from "../SearchTable/DefaultColumnFilter";
import fuzzyTextFilter from "../SearchTable/fuzzyTextFilter";

interface HeaderGroupProperties<T extends Record<string, unknown>>
  extends HeaderGroup<T> {
  className?: string;
  style?: object;
}

interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  getHeaderGroupProps?: Function;
  getRowProps?: Function;
  getCellProps?: Function;
  showOnFilter?: boolean;
  FiltersGroup?: ElementType;
}

export default function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  let {
    columns,
    data,
    getRowProps,
    getCellProps,
    getHeaderGroupProps,
    showOnFilter,
    FiltersGroup
  } = props;

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  ) as Partial<Column<T>>;

  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilter }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    allColumns,
    prepareRow,
    filteredRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters
  );

  let showTable = true;
  if (showOnFilter && filteredRows.length === data.length) {
    showTable = false;
  }

  return (
    <>
      {FiltersGroup && <FiltersGroup columns={allColumns} />}
      {showTable && (
        <div className="table-responsive table-borderless border shadow">
          <table
            className="table table-striped mb-0"
            style={{ minWidth: "480px" }}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr
                  {...headerGroup.getHeaderGroupProps([
                    getHeaderGroupProps && getHeaderGroupProps(headerGroup)
                  ])}
                >
                  {headerGroup.headers.map(
                    (column: HeaderGroupProperties<T>) => (
                      <th
                        scope="col"
                        {...column.getHeaderProps([
                          {
                            className: column.className || "",
                            style: column.style || {}
                          }
                        ])}
                      >
                        {column.render("Header")}
                      </th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps([getRowProps && getRowProps(row)])}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps([
                            getCellProps && getCellProps(cell)
                          ])}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
