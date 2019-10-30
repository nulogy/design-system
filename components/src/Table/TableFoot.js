import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const StyledFooterRow = styled.tr({
  "&:first-of-type": {
    borderTop: `1px solid ${theme.colors.lightGrey}`
  }
});

const StyledTh = styled.th({
  fontWeight: "normal",
  textAlign: "left",
  padding: `${theme.space.x2} 0`,
  paddingRight: theme.space.x2,
  paddingLeft: theme.space.x2,
  color: theme.colors.darkGrey
});

const StyledTd = styled.td(() => ({
  paddingRight: theme.space.x2
}));

const TableFoot = () => (
  <tfoot>
    <StyledFooterRow>
      <StyledTh scope="row">Total</StyledTh>
      <StyledTd>18,600 eaches</StyledTd>
      <StyledTd>7,725 eaches</StyledTd>
      <StyledTd />
      <StyledTd />
      <StyledTd />
    </StyledFooterRow>
    <StyledFooterRow>
      <StyledTh scope="row">Attainment</StyledTh>
      <StyledTd />
      <StyledTd>41.5%</StyledTd>
      <StyledTd />
      <StyledTd />
      <StyledTd />
    </StyledFooterRow>
  </tfoot>
);

TableFoot.propTypes = {};

export default TableFoot;
