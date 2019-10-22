import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Icon } from "../Icon";
import { Flex } from "../Flex";

const PaginationButton = styled.button({
  border: 0,
  fontSize: theme.fontSizes.small,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  lineHeight: theme.lineHeights.smallTextBase,
  display: "flex",
  borderRadius: "2px",
  "&:not(:last-child)": {
    marginRight: theme.space.x2
  },
  "&:hover": {
    cursor: "pointer"
  }
});

const PreviousButton = () => {
  return (
    <PaginationButton>
      <Icon icon="leftArrow" /> Previous
    </PaginationButton>
  );
};

const NextButton = () => {
  return (
    <PaginationButton>
      Next <Icon icon="rightArrow" />
    </PaginationButton>
  );
};

const PageNumber = styled(PaginationButton)(props => ({
  background: props.currentPage ? theme.colors.whiteGrey : "transparent"
}));

const Pagination = props => {
  const { currentPage, totalPages } = props;
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1);

  return (
    <Flex>
      <PreviousButton />
      {pages.map(page => {
        return <PageNumber currentPage={currentPage === page}>{page}</PageNumber>;
      })}
      <NextButton />
    </Flex>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {};

export default Pagination;
