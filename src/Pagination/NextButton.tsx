import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Icon } from "../Icon";
import PaginationButton from "./PaginationButton";

type NextButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: ReactNode;
  ariaLabel?: string;
  showIconOnly?: boolean;
};

const NextButton = ({ disabled, onClick, label, ariaLabel, showIconOnly }: NextButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PaginationButton
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || t("go to next results")}
      iconOnly={showIconOnly}
    >
      {!showIconOnly && (label || t("next"))}
      <Icon icon="rightArrow" mr={showIconOnly ? "0" : `-${theme.space.x1}`} />
    </PaginationButton>
  );
};

export default NextButton;
