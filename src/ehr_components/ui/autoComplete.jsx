import React, { Fragment, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

function AutoComplete(props) {
  let { options, multiple } = props;

  const [focus, setCount] = useState(false);
  const [currentText, setCurrentText] = useState(false);
  // let patient = useContext(PatientContext);

  return (
    <Fragment>
      <Typeahead
        id="onclear-example"
        options={options ? options : []}
        onChange={selected => {
          if (selected.length != 0) props.selected(selected);
          else props.selected(null);
        }}
        onInputChange={(value, onClear) => {
          value && <ClearButton onClick={onClear} />;
        }}
        placeholder={"Search " + props.title}
        onFocus={() => setCount(true)}
        onBlur={() => setCount(false)}
        multiple={multiple}
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
