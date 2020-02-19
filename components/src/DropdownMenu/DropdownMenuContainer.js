import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Box } from "../Box";

const getThemeColor = color => (theme.colors[color] ? theme.colors[color] : color);

const getMenuMargin = (placement, showArrow) => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: showArrow ? "4px" : null
      };
    case "right":
      return {
        marginLeft: showArrow ? "8px" : null,
        marginTop: showArrow ? null : "-8px"
      };
    case "left":
      return {
        marginRight: showArrow ? "8px" : null,
        marginTop: showArrow ? null : "-8px"
      };
    case "bottom":
    default:
      return {
        marginTop: showArrow ? "4px" : null
      };
  }
};

const DropdownMenuContainer = styled(Box)(({ dataPlacement, showArrow, backgroundColor }) => ({
  backgroundColor: getThemeColor(backgroundColor),
  borderRadius: theme.radii.medium,
  borderTop: `1px solid  ${getThemeColor(backgroundColor)}`,
  borderBottom: `1px solid ${getThemeColor(backgroundColor)}`,
  boxShadow: theme.shadows.small,
  padding: "7px 0",
  zIndex: "100",
  ...getMenuMargin(dataPlacement, showArrow)
}));

DropdownMenuContainer.propTypes = {
  backgroundColor: PropTypes.string,
  showArrow: PropTypes.bool
};

DropdownMenuContainer.defaultProps = {
  backgroundColor: "whiteGrey",
  showArrow: true
};

export default DropdownMenuContainer;
