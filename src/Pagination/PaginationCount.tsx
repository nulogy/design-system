import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../Type";

type PaginationCountProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationCount = ({ currentPage, totalPages }: PaginationCountProps) => {
  const { t } = useTranslation();

  return (
    <Text fontSize="small" lineHeight="smallTextBase" mx="x2">
      {t("current page of total", { currentPage, totalPages })}
    </Text>
  );
};

export default PaginationCount;
