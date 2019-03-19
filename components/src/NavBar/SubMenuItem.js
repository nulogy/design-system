import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import Text from "../Type/Text";
import theme from "../theme";

const SubMenuItemLink = styled(Link)({
  display: "block",
  padding: `${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.lightGrey,
    "p:first-child": {
      textDecoration: "underline",
    },
  },
  "&:disabled": {
    opacity: ".5",
  },
});

const BaseSubMenuItem = React.forwardRef(({
  href,
  children,
  subText,
  ...props
}, ref) => (
  <li { ...props }>
    <SubMenuItemLink ref={ ref } tabIndex="-1" color="darkBlue" underline={ false } href={ href }>
      <Text>{children}</Text>
      {subText && (
      <Text color="darkGrey" fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }>
        {subText}
      </Text>
      )}
    </SubMenuItemLink>
  </li>
));

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
  maxWidth: "20em",
});

export default SubMenuItem;
