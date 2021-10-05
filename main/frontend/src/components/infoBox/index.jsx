import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import InfoboxStyle from "./infobox.style";

const InfoBox = ({ success, warning, danger, children }) => {
  const classes = classNames("DA-infobox", {
    danger,
    success,
    warning,
  });
  return (
    <InfoboxStyle>
      <div className={classes}>{children}</div>
    </InfoboxStyle>
  );
};

InfoBox.propTypes = {
  danger: propTypes.bool,
  warning: propTypes.bool,
  success: propTypes.bool,
  children: propTypes.node,
};

export default InfoBox;
