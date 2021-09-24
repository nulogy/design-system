// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

const PreviousButton = ({
  disabled,
  onClick,
  label,
  "aria-label": ariaLabel,
}: any) => {
  const { t } = useTranslation();
  return (
    <PaginationButton
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || t("go to previous results")}
    >
      <Icon icon="leftArrow" ml="-8px" /> {label || t("previous")}
    </PaginationButton>
  );
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.node,
  "aria-label": PropTypes.string,
};

PreviousButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined,
};

export default PreviousButton;
