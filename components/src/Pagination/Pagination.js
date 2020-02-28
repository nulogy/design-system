import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import theme from "../theme";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import { Text } from "../Type";

const getHoverBackground = (currentPage, disabled) => {
  if (currentPage) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return "inital";
  }
  return theme.colors.lightGrey;
};

const PaginationButton = styled.button(props => ({
  fontSize: theme.fontSizes.small,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  lineHeight: theme.lineHeights.smallTextBase,
  display: "flex",
  borderRadius: theme.radii.medium,
  border: `1px solid ${props.currentPage ? theme.colors.darkBlue : theme.colors.lightGrey}`,
  color: props.disabled ? theme.colors.grey : theme.colors.black,
  "&:not(:last-child)": {
    marginRight: theme.space.x2
  },
  cursor: props.disabled ? "default" : "pointer",
  "&:hover": {
    background: getHoverBackground(props.currentPage, props.disabled)
  }
}));

const PreviousButton = ({ disabled, onClick, label, "aria-label": ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <PaginationButton disabled={disabled} onClick={onClick} aria-label={ariaLabel || t("go to previous results")}>
      <Icon icon="leftArrow" ml="-8px" /> {label || t("previous")}
    </PaginationButton>
  );
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  "aria-label": PropTypes.string
};

PreviousButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined
};

const NextButton = ({ disabled, onClick, label, "aria-label": ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <PaginationButton disabled={disabled} onClick={onClick} aria-label={ariaLabel || t("go to next results")}>
      {label || t("next")} <Icon icon="rightArrow" mr="-8px" />
    </PaginationButton>
  );
};

NextButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  "aria-label": PropTypes.string
};

NextButton.defaultProps = {
  disabled: false,
  onClick: null,
  label: undefined,
  "aria-label": undefined
};

const PageNumber = styled(PaginationButton)(props => ({
  background: props.currentPage ? theme.colors.darkBlue : "transparent",
  color: props.currentPage ? theme.colors.whiteGrey : theme.colors.black
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
  return [1, SEPERATOR, ...pages.slice(currentPage - 2, currentPage + 2), SEPERATOR, totalPages];
};

const Pagination = props => {
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
    <Flex as="nav" aria-label={ariaLabel || t("pagination navigation")} {...restProps}>
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
            <Text key={`sep${index}`} py="x1" mr="x2" fontSize="small" lineHeight="smallTextBase">
              {SEPERATOR}
            </Text>
          );
        else
          return (
            <PageNumber
              aria-current={isCurrentPage}
              currentPage={isCurrentPage}
              disabled={isCurrentPage}
              aria-label={isCurrentPage ? null : t("go to page", { count: page })}
              key={page}
              onClick={() => onSelectPage(page)}
            >
              {page}
            </PageNumber>
          );
      })}
      <NextButton disabled={currentPage === totalPages} onClick={onNext} ariaLabel={nextAriaLabel} label={nextLabel} />
    </Flex>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSelectPage: PropTypes.func,
  nextLabel: PropTypes.string,
  nextAriaLabel: PropTypes.string,
  previousLabel: PropTypes.string,
  previousAriaLabel: PropTypes.string,
  "aria-label": PropTypes.string
};

Pagination.defaultProps = {
  onNext: null,
  onPrevious: null,
  onSelectPage: null,
  nextLabel: undefined,
  nextAriaLabel: undefined,
  previousLabel: undefined,
  previousAriaLabel: undefined,
  "aria-label": undefined
};

export default Pagination;
