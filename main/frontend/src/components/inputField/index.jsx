import React from "react";
import propTypes from "prop-types";
import InputFieldStyle from "./input.style";
import classNames from "classnames";

const InputField = (props) => {
  const {
    name,
    type = "text",
    onChange,
    required,
    placeHolder,
    lite,
    defaultValue,
  } = props;
  const classes = classNames("DA-input-field", {
    lite: lite,
  });

  return (
    <InputFieldStyle>
      <div className={classes}>
        <input
          name={name}
          type={type}
          onChange={onChange}
          required={required}
          placeholder={placeHolder}
          defaultValue={defaultValue}
        />
      </div>
    </InputFieldStyle>
  );
};

InputField.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func,
  required: propTypes.bool,
  placeHolder: propTypes.string,
  lite: propTypes.bool,
  defaultValue: propTypes.string,
};

export default InputField;
