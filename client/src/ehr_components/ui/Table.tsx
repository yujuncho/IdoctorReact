import { ReactElement, PropsWithChildren } from "react";
import { useTable, TableOptions, HeaderGroup } from "react-table";

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
}

export default function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  let { columns, data, getRowProps, getCellProps, getHeaderGroupProps } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data
    });

  return (
    <div className="table-responsive">
      <table
        className="table table-striped"
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
              {headerGroup.headers.map((column: HeaderGroupProperties<T>) => (
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
              ))}
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
  );
}
