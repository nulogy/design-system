import React, { ReactNode } from "react";
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

export default NextButton;
