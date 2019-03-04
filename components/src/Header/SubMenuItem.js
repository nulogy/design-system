import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, Text } from "ComponentsRoot";
import theme from "../theme";

const SubMenuItemLink = styled(Link)({
  display: "block",
  padding: `${theme.space.half} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.lightGrey,
  },
  "&:disabled": {
    opacity: ".5",
  },
});

const BaseSubMenuItem = ({
  href,
  children,
  subText,
  ...props
}) => (
  <li { ...props }>
    <SubMenuItemLink tabIndex="-1" color="darkBlue" underline={ false } href={ href }>
      {children}
      {subText && (
      <Text color="darkGrey" style={{userSelect:"none"}} fontSize={ theme.fontSizes.small }>
        {subText}
      </Text>
      )}
    </SubMenuItemLink>
  </li>
);

BaseSubMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  subText: PropTypes.string,
  href: PropTypes.string,
};

BaseSubMenuItem.defaultProps = {
  subText: undefined,
  href: "/",
};

const SubMenuItem = styled(BaseSubMenuItem)({
  color: theme.colors.black,
  borderColor: "transparent",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
});

export default SubMenuItem;
