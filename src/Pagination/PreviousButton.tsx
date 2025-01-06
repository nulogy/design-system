import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

type PreviousButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: ReactNode;
  ariaLabel?: string;
  showIconOnly?: boolean;
};

const PreviousButton = ({ disabled = false, onClick = null, label, ariaLabel, showIconOnly }: PreviousButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PaginationButton
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || t("go to previous results")}
      iconOnly={showIconOnly}
    >
      <Icon icon="leftArrow" ml={showIconOnly ? "0" : `-${theme.space.x1}`} />
      {!showIconOnly && (label || t("previous"))}
    </PaginationButton>
  );
};

export default PreviousButton;
