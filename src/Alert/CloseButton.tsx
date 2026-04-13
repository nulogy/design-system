import type React from "react";
import { useTranslation } from "react-i18next";
import { ControlIcon } from "../Button";
import { Flex } from "../Flex";

type CloseButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label": string;
};

const CloseButton = ({ onClick, "aria-label": ariaLabel }: CloseButtonProps) => {
  const { t } = useTranslation();
  return (
    <Flex ml="x2" height="x3">
      <ControlIcon size="x3" icon="close" onClick={onClick} aria-label={ariaLabel || t("close")} label={t("close")} />
    </Flex>
  );
};

export default CloseButton;
