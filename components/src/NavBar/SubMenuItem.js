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
  },
  "&:disabled": {
    opacity: ".5",
  },
});

const BaseSubMenuItem = React.forwardRef(({
  href,
  name,
  description,
  nameColor,
  descriptionColor,
  tabIndex,
  ...props
}, ref) => (
  <li { ...props }>
    <SubMenuItemLink ref={ ref } tabIndex={ tabIndex } underline={ false } href={ href }>
      <Text color={ nameColor }>{ name }</Text>
      {description && (
      <Text color={ descriptionColor } fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }>
        {description}
      </Text>
      )}
    </SubMenuItemLink>
  </li>
));

BaseSubMenuItem.propTypes = {
  name: PropTypes.node.isRequired,
  description: PropTypes.string,
  href: PropTypes.string,
  nameColor: PropTypes.string,
  descriptionColor: PropTypes.string,
  tabIndex: PropTypes.string,
};

BaseSubMenuItem.defaultProps = {
  description: undefined,
  href: "/",
  nameColor: "darkBlue",
  descriptionColor: "darkGrey",
  tabIndex: null,
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
