import { useRef, RefObject } from "react";
import { FilterProps } from "react-table";
import { Typeahead } from "react-bootstrap-typeahead";

import AutoComplete from "../ui/AutoComplete";

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  column
}: FilterProps<T>) {
  const { id, setFilter, render } = column;
  const autoCompleteRef = useRef() as RefObject<Typeahead<any>>;

  let valuesAlreadySeen = new Set();
  let options = column.preFilteredRows.flatMap(row => {
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
      ref={autoCompleteRef}
      name={id}
      placeholder={`Patient ${render("Header")}`}
      options={options}
      onSelect={(selected: any) => {
        if (selected.length > 0) {
          setFilter(selected[0].value);
        }
      }}
      onKeyDown={(e: Event) => {
        let { key } = e as KeyboardEvent;
        if (key === "Enter" || key === "Escape" || key === "Tab") {
          autoCompleteRef.current?.blur();
        }
      }}
      onBlur={(e: Event) => {
        let { value } = e.target as HTMLInputElement;
        setFilter(value.trim());
      }}
      onClear={() => setFilter("")}
      className="mb-4"
    />
  );
}
