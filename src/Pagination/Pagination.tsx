// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import { Text } from "../Type";

const getHoverBackground = (currentPage, disabled, theme) => {
  if (currentPage) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return "inital";
  }
  return theme.colors.lightGrey;
};

const PaginationButton = styled.button(
  ({ theme, disabled, currentPage }: any) => ({
    fontSize: theme.fontSizes.small,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    lineHeight: theme.lineHeights.smallTextBase,
    display: "flex",
    borderRadius: theme.radii.medium,
    border: `1px solid ${
      currentPage ? theme.colors.darkBlue : theme.colors.lightGrey
    }`,
    color: disabled ? theme.colors.grey : theme.colors.black,
    "&:not(:last-child)": {
      marginRight: theme.space.x2,
    },
    cursor: disabled ? "default" : "pointer",
    "&:hover": {
      background: getHoverBackground(currentPage, disabled, theme),
    },
  })
);

const PreviousButton = ({
  disabled,
  onClick,
  label,
  "aria-label": ariaLabel,
}: any) => {
  const { t } = useTranslation();
  return (
    <PaginationButton
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || t("go to previous results")}
    >
      <Icon icon="leftArrow" ml="-8px" /> {label || t("previous")}
    </PaginationButton>
  );
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.node,
  "aria-label": PropTypes.string,
};

PreviousButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined,
};

const NextButton = ({ disabled, onClick, label, "aria-label": ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <PaginationButton
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || t("go to next results")}
    >
      {label || t("next")} <Icon icon="rightArrow" mr="-8px" />
    </PaginationButton>
  );
};

NextButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.node,
  "aria-label": PropTypes.string,
};

NextButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined,
};

const PageNumber = styled(PaginationButton)(({ theme, currentPage }: any) => ({
  background: currentPage ? theme.colors.darkBlue : "transparent",
  color: currentPage ? theme.colors.whiteGrey : theme.colors.black,
}));

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

const Pagination: React.SFC<any> = (props) => {
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
