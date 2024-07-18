import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const CustomDatalist = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected index
  const inputRef = useRef(null);
  const datalistRef = useRef(null);

  useEffect(() => {
    // Close dropdown if clicking outside
    const handleClickOutside = (event) => {
      if (
        datalistRef.current &&
        !datalistRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (props.inputSelected) {
      props.inputSelected(inputValue, props.refname);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterOptions(value);
  };

  const filterOptions = (value) => {
    if (value) {
      const filtered =
        props.options &&
        props.options.filter(
          (option) =>
            option[props.refname] &&
            option[props.refname].toLowerCase().includes(value.toLowerCase())
        );
      setFilteredOptions(filtered);
      setSelectedIndex(-1); // Reset selected index when filtering options
    } else {
      setFilteredOptions(props.options);
    }
    setIsOpen(true);
  };

  const handleFocus = () => {
    filterOptions(inputValue);
  };

  const handleOptionClick = (option) => {
    props.getKey(
      props.refname === "DivisionName"
        ? {
            [props.refid]: option[props.refid],
            [props.refname]: option[props.refname],
          }
        : props.refname
        ? { [props.refid]: option[props.refid] }
        : option
    );
    setInputValue(props.refname ? option[props.refname] : option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (filteredOptions && filteredOptions.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleOptionClick(filteredOptions[selectedIndex]);
    }
  };

  const clear = () => {
    setInputValue("");
  };

  return (
    <div className="relative w-full h-full" ref={datalistRef}>
      <input
        style={{
          height: props.height ? props.height : "",
          width: props.width ? props.width : "",
          marginTop: props.marginTop ? props.marginTop : "",
        }}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Handle keyboard events
        onFocus={handleFocus}
        ref={inputRef}
        className="w-full text-xs p-1 border border-gray-300 rounded"
        placeholder={props.fieldName ? `Search for ${props.fieldName}` : ""}
        required
      />
      {inputValue.length > 0 ? (
        <div className="absolute top-1 right-1 cursor-pointer">
          <IoIosClose onClick={clear} />
        </div>
      ) : (
        ""
      )}
      {props.options && isOpen && (
        <div
          style={{ zIndex: "9" }}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option[props.refid]}
                onClick={() => handleOptionClick(option)}
                className={`p-1 text-xs cursor-pointer ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }`}
              >
                {option[props.refname] ? option[props.refname] : option}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Please Select workType</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDatalist;
