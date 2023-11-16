import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

type PreviousButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: ReactNode;
  ariaLabel: string;
};

const PreviousButton = ({ disabled, onClick, label, ariaLabel }: PreviousButtonProps) => {
  const { t } = useTranslation();
  return (
    <PaginationButton disabled={disabled} onClick={onClick} aria-label={ariaLabel || t("go to previous results")}>
      <Icon icon="leftArrow" ml="-8px" /> {label || t("previous")}
    </PaginationButton>
  );
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.node,
  ariaLabel: PropTypes.string,
};

PreviousButton.defaultProps = {
  disabled: false,
  onClick: null,
};

export default PreviousButton;
