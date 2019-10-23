import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  borderRadius: "4px",
  border: `1px solid ${theme.colors.lightGrey}`,
  color: props.disabled ? theme.colors.grey : theme.colors.black,
  "&:not(:last-child)": {
    marginRight: theme.space.x2
  },
  cursor: props.disabled ? "default" : "pointer",
  "&:hover": {
    background: getHoverBackground(props.currentPage, props.disabled)
  }
}));

const PreviousButton = props => {
  const { disabled } = props;
  return (
    <PaginationButton disabled={disabled}>
      <Icon icon="leftArrow" ml="-8px" /> Previous
    </PaginationButton>
  );
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool
};

PreviousButton.defaultProps = {
  disabled: false
};

const NextButton = props => {
  const { disabled } = props;
  return (
    <PaginationButton disabled={disabled}>
      Next <Icon icon="rightArrow" mr="-8px" />
    </PaginationButton>
  );
};

NextButton.propTypes = {
  disabled: PropTypes.bool
};

NextButton.defaultProps = {
  disabled: false
};

const PageNumber = styled(PaginationButton)(props => ({
  background: props.currentPage ? theme.colors.darkBlue : "transparent",
  color: props.currentPage ? theme.colors.whiteGrey : theme.colors.black,
  ...props
}));

const SEPERATOR = "...";

const getPageItemstoDisplay = (totalPages, currentPage) => {
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1);
  if (totalPages <= 5) return pages;
  if (currentPage === 1) return [...pages.splice(currentPage - 1, 2), SEPERATOR, totalPages];
  if (currentPage === totalPages) return [1, SEPERATOR, ...pages.splice(totalPages - 2, 2)];
  else {
    return [1, SEPERATOR, ...pages.splice(currentPage - 2, 3), SEPERATOR, totalPages];
  }
};

const Pagination = props => {
  const { currentPage, totalPages, onNext } = props;

  return (
    <Flex as="nav" aria-label="Pagination navigation">
      <PreviousButton disabled={currentPage === 1} />
      {getPageItemstoDisplay(totalPages, currentPage).map(page => {
        const isCurrentPage = currentPage === page;

        if (page === SEPERATOR)
          return (
            <Text py="x1" mr="x2" fontSize="small" lineHeight="smallTextBase">
              {SEPERATOR}
            </Text>
          );
        else
          return (
            <PageNumber
              aria-current={isCurrentPage}
              currentPage={isCurrentPage}
              disabled={isCurrentPage}
              aria-label={`Go to page ${page}`}
              key={page}
            >
              {page}
            </PageNumber>
          );
      })}
      <NextButton disabled={currentPage === totalPages} onClick={onNext} />
    </Flex>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func
};

Pagination.defaultProps = {
  onNext: null
};

export default Pagination;
