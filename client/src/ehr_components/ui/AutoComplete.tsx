import React, {
  Fragment,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  RefObject,
  MouseEventHandler
} from "react";
import { Spinner } from "react-bootstrap";
import {
  ClearButton,
  Typeahead,
  TypeaheadMenuProps,
  Menu,
  MenuItem
} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface AutoCompleteProps {
  name?: string;
  placeholder?: string;
  options: any[];
  defaultSelected?: any[];
  multiple?: boolean;
  onSelect: (select: any) => void;
  onKeyDown?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onClear?: () => void;
  className?: string;
}

interface TypeaheadChildrenProps {
  onClear: MouseEventHandler<"button">;
  selected: any[];
  text: string;
}

const AutoComplete = forwardRef((props: AutoCompleteProps, ref) => {
  let {
    name,
    placeholder,
    options,
    defaultSelected,
    multiple,
    onSelect,
    onKeyDown,
    onBlur,
    onClear,
    className
  } = props;
  const [focus, setFocus] = useState(false);
  const typeaheadRef = useRef() as RefObject<Typeahead<any>>;

  const blur = () => {
    typeaheadRef.current?.blur();
  };

  useImperativeHandle(ref, () => {
    return { blur };
  });

  const handleChange = (selected: any[]) => {
    onSelect(selected);
  };

  const handleBlur = (e: Event) => {
    onBlur && onBlur(e);
    setFocus(false);
  };

  const handleClear = () => {
    onClear && onClear();
  };

  const renderMenu = (results: any[], menuProps: TypeaheadMenuProps<any>) => {
    return (
      <Menu className="shadow" {...menuProps}>
        {results.map((result: any, index: number) => (
          <MenuItem option={result} position={index} key={result.id || index}>
            {result.label}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const renderChildren = ({
    onClear,
    selected,
    text
  }: TypeaheadChildrenProps) => {
    let handleClearClick = (e: React.MouseEvent<"button", MouseEvent>) => {
      onClear(e);
      onSelect([]);
      handleClear();
    };

    return (
      <div className="rbt-aux">
        {(selected.length > 0 || text) && (
          <ClearButton onClick={handleClearClick} />
        )}
        {focus && !text && <Spinner animation="grow" size="sm" />}
      </div>
    );
  };

  return (
    <Fragment>
      <Typeahead
        ref={typeaheadRef}
        id={name}
        options={options ? options : []}
        defaultSelected={defaultSelected ? defaultSelected : []}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={"Search " + placeholder}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        multiple={multiple}
        className={className}
        renderMenu={renderMenu}
      >
        {renderChildren}
      </Typeahead>
    </Fragment>
  );
});

export default AutoComplete;
