import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme";

const Text = styled.p`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  ${fontFamily}
  ${textAlign}
  -webkit-font-smoothing: antialiased;
  display: ${props => props.display}
`;
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...textAlign.propTypes,
  display: PropTypes.String,
};

Text.defaultProps = {
  m: 0,
  fontSize: 1,
<<<<<<< HEAD
<<<<<<< HEAD
  lineHeight: theme.lineHeights["base"],
  mb: 4,
  color: "currentColor",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
  lineHeight: theme.lineHeights.base,
  mb: 4,
};
>>>>>>> adds help text and format text to label component
=======
  lineHeight: theme.lineHeights['base'],
  mb: 4,
  color: 'black'
<<<<<<< HEAD
>>>>>>> adds help text and format text to label component
>>>>>>> adds help text and format text to label component
}
=======
  display: "block",
};
>>>>>>> sets up files for Label rename to Field
=======
}
<<<<<<< HEAD
>>>>>>> adds Label component and changes proptype for display on Text component
=======
=======
}
>>>>>>> adds help text and format text to label component
>>>>>>> adds help text and format text to label component
>>>>>>> adds help text and format text to label component

export default Text;
