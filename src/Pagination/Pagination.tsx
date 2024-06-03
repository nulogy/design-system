import React, { ReactNode, RefObject } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { flushSync } from "react-dom";
import { Flex } from "../Flex";
import { Text } from "../Type";
import { FlexProps } from "../Flex/Flex";
import PageNumber from "./PageNumber";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

const SEPARATOR = "..." as const;

export const getPageItemsToDisplay = (totalPages: number, currentPage: number): Array<typeof SEPARATOR | number> => {
  const MAX_PAGES_TO_SHOW = 6;

  const pages = Array.from({ length: totalPages }, (v, i) => i + 1);

  if (totalPages <= MAX_PAGES_TO_SHOW) return pages;
  if (currentPage <= MAX_PAGES_TO_SHOW - 1) {
    return [...pages.slice(0, 5), SEPARATOR, totalPages];
  }
  if (currentPage > totalPages - 5) {
    return [1, SEPARATOR, ...pages.slice(totalPages - 5)];
  }
  return [1, SEPARATOR, ...pages.slice(currentPage - 2, currentPage + 2), SEPARATOR, totalPages];
};

interface PaginationProps extends FlexProps {
  currentPage: number;
  totalPages: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSelectPage?: (page: number) => void;
  nextLabel?: ReactNode;
  nextAriaLabel?: string;
  previousLabel?: ReactNode;
  previousAriaLabel?: string;
  scrollToTopAfterPagination?: boolean;
  scrollTargetRef?: RefObject<HTMLElement>;
}

function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onSelectPage,
  nextAriaLabel,
  nextLabel,
  previousAriaLabel,
  previousLabel,
  scrollToTopAfterPagination,
  scrollTargetRef,
  "aria-label": ariaLabel,
  ...restProps
}: PaginationProps) {
  const { t } = useTranslation();

  const scrollToTop = () => {
    if (scrollToTopAfterPagination) {
      const top = scrollTargetRef?.current ? window.scrollY + scrollTargetRef.current?.getBoundingClientRect()?.top : 0;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex as="nav" aria-label={ariaLabel || t("pagination navigation")} {...restProps}>
      <PreviousButton
        disabled={currentPage === 1}
        onClick={() => {
          flushSync(() => {
            onPrevious();
          });

          scrollToTop();
        }}
        ariaLabel={previousAriaLabel}
        label={previousLabel}
      />
      {getPageItemsToDisplay(totalPages, currentPage).map((page, index) => {
        const isCurrentPage = currentPage === page;

        if (page === SEPARATOR)
          return (
            <Text key={`sep${index}`} py="x1" mr="x2" fontSize="small" lineHeight="smallTextBase">
              {SEPARATOR}
            </Text>
          );
        else
          return (
            <PageNumber
              aria-current={isCurrentPage}
              currentPage={isCurrentPage}
              disabled={isCurrentPage}
              aria-label={isCurrentPage ? null : t("go to page", { count: Number(page) })}
              key={page}
              onClick={() => {
                flushSync(() => {
                  onSelectPage(page);
                });

                scrollToTop();
              }}
            >
              {page}
            </PageNumber>
          );
      })}
      <NextButton
        disabled={currentPage === totalPages}
        onClick={() => {
          flushSync(() => {
            onNext();
          });

          scrollToTop();
        }}
        ariaLabel={nextAriaLabel}
        label={nextLabel}
      />
    </Flex>
  );
}

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
