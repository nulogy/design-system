// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Flex } from "../Flex";
import { Text } from "../Type";
import PageNumber from "./PageNumber";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

const SEPERATOR = "...";

export const getPageItemstoDisplay = (totalPages, currentPage) => {
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1);
  const MAX_PAGES_TO_SHOW = 6;
  if (totalPages <= MAX_PAGES_TO_SHOW) return pages;
  if (currentPage <= MAX_PAGES_TO_SHOW - 1) {
    return [...pages.slice(0, 5), SEPERATOR, totalPages];
  }
  if (currentPage > totalPages - 5) {
    return [1, SEPERATOR, ...pages.slice(totalPages - 5)];
  }
  return [
    1,
    SEPERATOR,
    ...pages.slice(currentPage - 2, currentPage + 2),
    SEPERATOR,
    totalPages,
  ];
};

const Pagination: React.FC<any> = (props) => {
  const {
    currentPage,
    totalPages,
    onNext,
    onPrevious,
    onSelectPage,
    nextAriaLabel,
    nextLabel,
    previousAriaLabel,
    previousLabel,
    "aria-label": ariaLabel,
    ...restProps
  } = props;
  const { t } = useTranslation();
  return (
    <Flex
      as="nav"
      aria-label={ariaLabel || t("pagination navigation")}
      {...restProps}
    >
      <PreviousButton
        disabled={currentPage === 1}
        onClick={onPrevious}
        ariaLabel={previousAriaLabel}
        label={previousLabel}
      />
      {getPageItemstoDisplay(totalPages, currentPage).map((page, index) => {
        const isCurrentPage = currentPage === page;

        if (page === SEPERATOR)
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Text
              key={`sep${index}`}
              py="x1"
              mr="x2"
              fontSize="small"
              lineHeight="smallTextBase"
            >
              {SEPERATOR}
            </Text>
          );
        else
          return (
            <PageNumber
              aria-current={isCurrentPage}
              currentPage={isCurrentPage}
              disabled={isCurrentPage}
              aria-label={
                isCurrentPage ? null : t("go to page", { count: page })
              }
              key={page}
              onClick={() => onSelectPage(page)}
            >
              {page}
            </PageNumber>
          );
      })}
      <NextButton
        disabled={currentPage === totalPages}
        onClick={onNext}
        ariaLabel={nextAriaLabel}
        label={nextLabel}
      />
    </Flex>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSelectPage: PropTypes.func,
  nextLabel: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  previousLabel: PropTypes.node,
  previousAriaLabel: PropTypes.string,
  "aria-label": PropTypes.string,
};

Pagination.defaultProps = {
  onNext: null,
  onPrevious: null,
  onSelectPage: null,
  nextLabel: undefined,
  nextAriaLabel: undefined,
  previousLabel: undefined,
  previousAriaLabel: undefined,
  "aria-label": undefined,
};

export default Pagination;
