import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import Text from "../Type/Text";
import theme from "../theme";

const screen = props => {
  switch (props.screen) {
    case "small":
      return {
        color: theme.colors.green,
      };
    case "medium":
      return {
        color: theme.colors.red,
      };
  }
};

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

const Description = styled(Text)``

const BaseSubMenuItem = React.forwardRef(({
  href,
  children,
  subText,
  screen,
  ...props
}, ref) => (
  <li { ...props }>
    <SubMenuItemLink ref={ ref } tabIndex="-1" underline={ false } href={ href }>
      <Text>{children}</Text>
      {subText && (
      <Description>
        {subText}
      </Description>
      )}
    </SubMenuItemLink>
  </li>
));

BaseSubMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  subText: PropTypes.string,
  href: PropTypes.string,
  screen: PropTypes.oneOf(["small", "medium"]),
};

BaseSubMenuItem.defaultProps = {
  subText: undefined,
  href: "/",
  screen: "medium",
};













const SubMenuItem = styled(BaseSubMenuItem)(
  screen,
  ({ small, medium }) => ({
  //color: theme.colors.black,
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
  [`${SubMenuItemLink}`]: {
    color: theme.colors.darkBlue,
  },
  [`${Description}`]: {
    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallTextBase,
    //color: theme.colors.darkGrey,
  },
})
);

export default SubMenuItem;
