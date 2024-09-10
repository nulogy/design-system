import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

type PreviousButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: ReactNode;
  ariaLabel: string;
};

const PreviousButton = ({ disabled = false, onClick = null, label, ariaLabel }: PreviousButtonProps) => {
  const { t } = useTranslation();
  return (
    <PaginationButton disabled={disabled} onClick={onClick} aria-label={ariaLabel || t("go to previous results")}>
      <Icon icon="leftArrow" ml="-8px" /> {label || t("previous")}
    </PaginationButton>
  );
};

export default PreviousButton;
