// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

const NextButton = ({ disabled, onClick, label, "aria-label": ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <PaginationButton disabled={disabled} onClick={onClick} aria-label={ariaLabel || t("go to next results")}>
      {label || t("next")} <Icon icon="rightArrow" mr="-8px" />
    </PaginationButton>
  );
};

NextButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.node,
  "aria-label": PropTypes.string,
};

NextButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined,
};

export default NextButton;
