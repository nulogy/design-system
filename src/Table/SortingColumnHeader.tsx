import type React from "react";
import { useTranslation } from "react-i18next";
import { ControlIcon } from "../Button";
import { Flex } from "../Flex";
import { Text } from "../Type";

interface SortingColumnHeaderProps {
  onChange?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  label?: string;
  ascending?: boolean;
  active?: boolean;
}

function SortingColumnHeader({
  onChange,
  label,
  ariaLabel,
  ascending = false,
  active = false,
}: SortingColumnHeaderProps) {
  const { t } = useTranslation();
  const defaultAriaLabel = ascending ? t("sort descending") : t("sort ascending");

  return (
    <Flex alignItems="center">
      <Text mr="x1">{label}</Text>
      <ControlIcon
        size="x3"
        icon={ascending ? "sortDown" : "sortUp"}
        label={ariaLabel || defaultAriaLabel}
        toggled={active}
        onClick={onChange}
      />
    </Flex>
  );
}

export default SortingColumnHeader;
