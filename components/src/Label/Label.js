import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme.js";
import Text from "../Type/Text.js";
import Box from "../Box/Box.js";

const LabelText = props => (
  <Text 
    display="inline" 
    mb={ 0 } 
    fontSize={ theme.fontSizes[1] }
  >
    {props.children}
  </Text>
)

const RequirementText = props => (
  <Text 
    display="inline" 
    mb={ 0 } 
    ml={ 2 }
    fontSize="12px"
    color="darkGrey"
  >
    {props.children}
  </Text>
)

const HelpText = props => (
  <Text 
    mb={ 0 } 
    fontSize={ theme.fontSizes[0] }
    lineHeight={ theme.lineHeights.smallTextBase }
  >
  {props.children}
  </Text>
)

const FormatText = props => (
  <Text 
    mb={ 0 } 
    fontSize="12px"
    lineHeight="16px"
    color="darkGrey"
  >
  {props.children}
  </Text>
)

const Label = props => (
  <Box { ...props }>
    <LabelText { ...props.labelText }/>
    <RequirementText { ...props.requirementText }/>
    <HelpText { ...props.helpText }/>
    <FormatText { ...props.formatText }/>
  </Box>
);

Label.propTypes = {
  labelText: PropTypes.shape({}).isRequired,
  requirementText: PropTypes.shape({}),
  helpText: PropTypes.shape({}),
  formatText: PropTypes.shape({}),
};

Label.defaultProps = {
  requirementText: {message: null},
  helpText: {message: null},
  formatText: {message: null},
};

export default Label;
