import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import Text from "../Type/Text";
import theme from "../theme";

const BaseSubMenuLink = React.forwardRef(({
  href,
  name,
  description,
  nameColor,
  descriptionColor,
  underline,
  tabIndex,
  ...props
}, ref) => (
  <Link { ...props } color={ nameColor } ref={ ref } tabIndex={ tabIndex } underline={ underline } href={ href }>
    <Text color={ nameColor }>{ name }</Text>
    {description && (
    <Text color={ descriptionColor } fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }>
      {description}
    </Text>
    )}
  </Link>
));

BaseSubMenuLink.propTypes = {
  name: PropTypes.node.isRequired,
  description: PropTypes.string,
  href: PropTypes.string,
  nameColor: PropTypes.string,
  descriptionColor: PropTypes.string,
  tabIndex: PropTypes.string,
  underline: PropTypes.bool,
};

BaseSubMenuLink.defaultProps = {
  description: undefined,
  href: "/",
  nameColor: "darkBlue",
  descriptionColor: "darkGrey",
  tabIndex: null,
  underline: false,
};

const SubMenuLink = styled(BaseSubMenuLink)((props) => ({
  color: "grey",
  borderColor: "transparent",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  maxWidth: "20em",
 
    display: "block",
    padding: `${theme.space.x1} ${theme.space.x2}`,
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
    },
    "&:disabled": {
      opacity: ".5",
    },
  
}));

SubMenuLink.propTypes = {
  hoverColor: PropTypes.string,
};

SubMenuLink.defaultProps = {
  hoverColor: "lightGrey",
};

export default SubMenuLink;
