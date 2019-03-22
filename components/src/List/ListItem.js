import styled from "styled-components";
import { space, color } from "styled-system";
import theme from "../theme";

const ListItem = styled.li(
  space,
  color,
  {
    "&:last-child": {
      marginBottom: 0,
    },
  }
);

ListItem.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

ListItem.defaultProps = {
  color: "currentColor",
  mb: theme.space.x1,
};

export default ListItem;
