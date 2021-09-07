import { ColumnInstance } from "react-table";

interface FiltersGroupProps {
  columns: ColumnInstance[];
}

export default function FiltersGroup(props: FiltersGroupProps) {
  let { columns } = props;
  return (
    <div className="mb-5">
      {columns
        .filter(it => it.canFilter)
        .map(column => (
          <div key={column.id}>{column.render("Filter")}</div>
        ))}
    </div>
  );
}
