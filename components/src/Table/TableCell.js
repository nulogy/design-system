import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const StyledTableCell = styled.div(({ align }) => ({
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  textAlign: align
}));

const TableCell = ({ children, align }) => <StyledTableCell align={align}>{children}</StyledTableCell>;

TableCell.propTypes = {
  children: PropTypes.string,
  align: PropTypes.string
};

TableCell.defaultProps = {
  children: "",
  align: undefined
};

export default TableCell;
