import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Icon } from "../Icon";
import { Flex } from "../Flex";

const PaginationButton = styled.button(props => ({
  border: 0,
  fontSize: theme.fontSizes.small,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  lineHeight: theme.lineHeights.smallTextBase,
  display: "flex",
  borderRadius: "2px",
  color: props.disabled ? theme.colors.grey : theme.colors.black,
  "&:not(:last-child)": {
    marginRight: theme.space.x2
  },
  cursor: props.disabled ? "default" : "pointer"
}));

const PreviousButton = props => {
  const { disabled } = props;
  return (
    <PaginationButton disabled={disabled}>
      <Icon icon="leftArrow" /> Previous
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
      Next <Icon icon="rightArrow" />
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
  background: props.currentPage ? theme.colors.whiteGrey : "transparent"
}));

const Pagination = props => {
  const { currentPage, totalPages } = props;
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1);

  return (
    <Flex>
      <PreviousButton disabled={currentPage === 1} />
      {pages.map(page => {
        return <PageNumber currentPage={currentPage === page}>{page}</PageNumber>;
      })}
      <NextButton disabled={currentPage === totalPages} />
    </Flex>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {};

export default Pagination;
