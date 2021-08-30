import { FilterProps } from "react-table";

import AutoComplete from "../ui/autoComplete";

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  column
}: FilterProps<T>) {
  const { id, setFilter, render } = column;

  let valuesAlreadySeen = new Set();
  let options = column.filteredRows.flatMap(row => {
    let rowValue = row.values[id];

    if (rowValue) {
      if (valuesAlreadySeen.has(rowValue)) {
        return [];
      } else {
        valuesAlreadySeen.add(rowValue);
        return [{ value: rowValue, label: rowValue, id: row.id }];
      }
    } else {
      return [];
    }
  });

  return (
    <AutoComplete
      name={id}
      placeholder={`Patient ${render("Header")}`}
      options={options}
      onSelect={(selected: any) => {
        setFilter(selected.label);
      }}
      className="mb-4"
    />
  );
}
