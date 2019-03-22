import styled from "styled-components";
import theme from "../theme";

const internalSpacingStyles = hasHelpText => {
  if (hasHelpText) {
    return ({
      "p": {
        marginBottom: theme.space.x1,
      },
    });
  } else {
    return ({
      "legend": {
        marginBottom: theme.space.x1,
      },
    });
  }
};

const Fieldset = styled.fieldset({
  padding: 0,
  border: 0,
  margin: 0,
  "legend": {
    padding: 0,
  },
},
({ hasHelpText }) => (
  internalSpacingStyles(hasHelpText)
),);

export default Fieldset;