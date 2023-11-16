import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

type NextButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: ReactNode;
  ariaLabel: string;
};

const NextButton = ({ disabled, onClick, label, ariaLabel }: NextButtonProps) => {
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
  ariaLabel: PropTypes.string,
};

NextButton.defaultProps = {
  disabled: false,
  onClick: null,
};

export default NextButton;
