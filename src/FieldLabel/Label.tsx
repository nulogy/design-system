import styled from "styled-components";
import { space, color } from "styled-system";
import PropTypes from "prop-types";

const Label = styled.label(space, color, () => ({
  display: "inline-block",
}));

Label.propTypes = {
  color: PropTypes.string,
};

Label.defaultProps = {
  color: "black",
};

export default Label;
