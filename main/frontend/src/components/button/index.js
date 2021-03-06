import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import ButtonStyle from "./button.style";

const Button = ({ warning, danger, success, onClick, children }) => {
  const classes = classNames("DA-button", {
    warning: warning,
    danger: danger,
    success: success,
  });
  return (
    <ButtonStyle>
      <div className={classes}>
        <button onClick={onClick}>{children}</button>
      </div>
    </ButtonStyle>
  );
};

Button.propTypes = {
  content: propTypes.string,
  onClick: propTypes.func,
  warning: propTypes.bool,
  danger: propTypes.bool,
  success: propTypes.bool,
};

export default Button;
