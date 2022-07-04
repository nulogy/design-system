import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Flex } from "../Flex";

type CloseButtonProps = {
  onClick: any;
  "aria-label": string;
};

const CloseButton = ({ onClick, "aria-label": ariaLabel }: CloseButtonProps) => {
  const { t } = useTranslation();
  return (
    <Flex ml="x2">
      <Link
        as="button"
        type="button"
        color="darkGrey"
        lineHeight="0"
        hover="blue"
        onClick={onClick}
        aria-label={ariaLabel || t("close")}
      >
        <Icon icon="close" size="16" />
      </Link>
    </Flex>
  );
};

export default CloseButton;
