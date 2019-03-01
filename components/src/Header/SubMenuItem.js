import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, Text } from "ComponentsRoot";
import theme from "../theme";

const BaseSubMenuItem = ({
  href,
  children,
  subText,
  ...props
}) => (
  <li { ...props }>
    <Link tabindex="-1"	color="darkBlue" underline={ false } href={ href }>
      {children}
    </Link>
    {subText && (
    <Text fontSize={ theme.fontSizes.small }>
      {subText}
    </Text>
    )}
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
  display: "inline",
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
  padding: `${theme.space.x1} ${theme.space.x1}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.grey,
  },
  "&:active": {
    transform: "scale(0.98)",
    transition: ".2s ease-in",
  },
  "&:disabled": {
    opacity: ".5",
  },
});

export default SubMenuItem;
