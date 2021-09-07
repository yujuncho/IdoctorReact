import { useMemo, ReactElement, PropsWithChildren, ElementType } from "react";
import {
  useTable,
  TableOptions,
  HeaderGroup,
  Column,
  useFilters,
  useSortBy
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
  headerProps?: Object;
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
    headerProps,
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
    useFilters,
    useSortBy
  );

  let showTable = true;
  if (showOnFilter && filteredRows.length === data.length) {
    showTable = false;
  }

  let renderSortIcon = <T extends Record<string, unknown>>(
    column: HeaderGroupProperties<T>
  ) => {
    if (column.canSort) {
      if (column.isSorted) {
        if (column.isSortedDesc) {
          return <i className="fa fa-sort-down" />;
        } else {
          return <i className="fa fa-sort-up" />;
        }
      } else {
        return <i className="fa fa-sort text-muted" />;
      }
    } else {
      return "";
    }
  };

  return (
    <>
      {FiltersGroup && <FiltersGroup columns={allColumns} />}
      {showTable && (
        <div
          className="table-responsive table-borderless border shadow mb-5"
          style={{ maxHeight: 440 }}
        >
          <table
            className="table table-striped mb-0"
            style={{ minWidth: 440 }}
            {...getTableProps()}
          >
            <thead {...headerProps}>
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
                          },
                          column.getSortByToggleProps()
                        ])}
                      >
                        {column.render("Header")}
                        <span className="pl-2">{renderSortIcon(column)}</span>
                      </th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length === 0 && (
                <tr>
                  <td>
                    <h3 className="m-0 p-3">No matches found</h3>
                  </td>
                </tr>
              )}
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
