import { Fragment, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  ClearButton,
  Typeahead,
  Menu,
  MenuItem
} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

function AutoComplete(props) {
  let { name, placeholder, options, multiple, onSelect, className } = props;
  const [focus, setFocus] = useState(false);

  const onChange = selected => {
    if (selected.length !== 0) {
      onSelect(selected[0]);
    } else {
      onSelect("");
    }
  };

  const renderMenu = (results, menuProps) => {
    return (
      <Menu className="shadow" {...menuProps}>
        {results.map((result, index) => (
          <MenuItem option={result} position={index} key={result.id || index}>
            {result.label}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  return (
    <Fragment>
      <Typeahead
        id={name}
        options={options ? options : []}
        onChange={onChange}
        placeholder={"Search " + placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        multiple={multiple}
        className={className}
        renderMenu={renderMenu}
      >
        {({ onClear, selected, value }) => (
          <div className="rbt-aux">
            {selected.length > 0 && <ClearButton onClick={onClear} />}
            {focus && !selected.length && (
              <Spinner animation="grow" size="sm" />
            )}
          </div>
        )}
      </Typeahead>
    </Fragment>
  );
}

export default AutoComplete;
