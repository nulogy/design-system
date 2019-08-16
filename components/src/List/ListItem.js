import styled from "styled-components";
import PropTypes from "prop-types";
import { space, color } from "styled-system";
import theme from "../theme";

const ListItem = styled.li(space, color, {
  "&:last-child": {
    marginBottom: 0
  }
});

ListItem.propTypes = {
  className: PropTypes.string,
  ...space.propTypes,
  ...color.propTypes
};

ListItem.defaultProps = {
  className: null,
  color: "currentColor",
  mb: theme.space.x1
};

export default ListItem;
