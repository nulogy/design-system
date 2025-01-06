import React, { ReactNode, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { flushSync } from "react-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { noop } from "../utils/noop";
import { Flex } from "../Flex";
import { Text } from "../Type";
import { FlexProps } from "../Flex/Flex";
import PageNumber from "./PageNumber";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import PaginationCount from "./PaginationCount";
import { getPageItemsToDisplay } from "./lib";

export const SEPARATOR = "..." as const;

interface PaginationProps extends FlexProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSelectPage?: (page: number) => void;
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  nextLabel?: ReactNode;
  nextAriaLabel?: string;
  previousLabel?: ReactNode;
  previousAriaLabel?: string;
  scrollToTopAfterPagination?: boolean;
  scrollTargetRef?: RefObject<HTMLElement>;
}

function Pagination({
  onNext = noop,
  onPrevious = noop,
  onSelectPage = noop,
  currentPage,
  totalPages,
  maxVisiblePages = 6,
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
  const phone = !useMediaQuery("phoneLandscape");
  const largerThanPhone = useMediaQuery("tabletPortrait");

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
    <Flex as="nav" gap="x2" aria-label={ariaLabel || t("pagination navigation")} alignItems="center" {...restProps}>
      <PreviousButton
        disabled={currentPage === 1}
        onClick={() => {
          flushSync(() => {
            onPrevious();
          });
          scrollToTop();
        }}
        ariaLabel={previousAriaLabel}
        label={phone ? null : previousLabel}
        showIconOnly={phone}
      />

      {largerThanPhone ? (
        getPageItemsToDisplay({ totalPages, currentPage, maxVisiblePages }).map((page, index) => {
          const isCurrentPage = currentPage === page;

          if (page === SEPARATOR)
            return (
              <Text key={`sep${index}`} py="x1" fontSize="small" lineHeight="smallTextBase">
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
        })
      ) : (
        <PaginationCount currentPage={currentPage} totalPages={totalPages} />
      )}

      <NextButton
        disabled={currentPage === totalPages}
        onClick={() => {
          flushSync(() => {
            onNext();
          });
          scrollToTop();
        }}
        ariaLabel={nextAriaLabel}
        label={phone ? null : nextLabel}
        showIconOnly={phone}
      />
    </Flex>
  );
}

export default Pagination;
