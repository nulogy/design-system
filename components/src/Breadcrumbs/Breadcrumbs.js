import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";
import { Flex } from "../Flex";
import { Icon } from "../Icon";

const insertSeparators = (items, className) => {
  return items.reduce((acc, current, index) => {
    return acc.concat(
      current,
      // eslint-disable-next-line react/no-array-index-key
      <StyledLi aria-hidden key={`separator-${index}`} className={className} px="x1">
        <Icon icon="rightArrow" />
      </StyledLi>
    );
  }, []);
};

const StyledLi = styled.li(
  () => ({
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "inline-flex",
    alignSelf: "center",
    color: theme.colors.darkGrey,
    "a:visited": {
      color: theme.colors.darkBlue
    }
  }),
  space
);

const StyledOl = styled.ol(() => ({
  margin: 0,
  padding: 0,
  display: "flex"
}));

const Breadcrumbs = ({ children, as }) => {
  const allItems = [...children].map((child, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <StyledLi key={`child-${index}`}>
        {React.cloneElement(child, {
          color: "darkBlue"
        })}
      </StyledLi>
    );
  });

  return (
    <Flex as={as}>
      <StyledOl>{insertSeparators(allItems, "seperator")}</StyledOl>
    </Flex>
  );
};

Breadcrumbs.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired
};

Breadcrumbs.defaultProps = {
  as: "nav"
};

export default Breadcrumbs;
