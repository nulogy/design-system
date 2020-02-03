import styled from "styled-components";
import PropTypes from "prop-types";
import { space, color } from "styled-system";
import propTypes from "@styled-system/prop-types";
import theme from "../theme";

const ListItem = styled.li(space, color, {
  "&:last-child": {
    marginBottom: 0
  }
});

ListItem.propTypes = {
  className: PropTypes.string,
  ...propTypes.space,
  ...propTypes.color
};

ListItem.defaultProps = {
  className: undefined,
  color: "currentColor",
  mb: theme.space.x1
};

export default ListItem;
