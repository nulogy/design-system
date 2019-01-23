<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import styled from "styled-components";
import { color, space, themeGet } from "styled-system";
import theme from "../theme";
import { subPx } from "../utils";

const InputField = styled.input`
  width: 100%;
  border: 1px solid;
  border-color:
    ${props => (props.borderColor ? themeGet(`colors.${props.borderColor}`, props.borderColor) : props.theme.colors.grey)}; 
  border-radius: ${theme.radii[1]};
  padding: ${subPx(theme.space[2])};
  font-size: ${theme.fontSizes[1]};
  font-family: ${theme.fonts.base};
  line-height: ${props => props.theme.lineHeights.base};
  ${space}
  ${color}
  &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.blue}; 
      box-shadow: 0 0 3px ${props => props.theme.colors.blue};
  }
`;

InputField.defaultProps = {
  theme,
};

// TEMPORARY TextInput
const TextInput = () => (
  <div>
    <InputField />
    <InputField disabled color="grey" borderColor="grey" />
    <InputField color="red" borderColor="red" />
  </div>
);
=======
import React from 'react'
import PropTypes from 'prop-types';
import theme from '../theme.js'
import InputField from './InputField.js'
import Text from '../Type/Text'
import Box from '../Box/Box'

//TEMPORARY TextInput
const TextInput = (props) => {
    return(
        <Box>
            <Text mb={0} fontSize={theme.fontSizes[1]} lineHeight={theme.lineHeights.smallTextBase}>I am helping</Text>
            <Text mb={0} fontSize='12px' lineHeight='16px' color='darkGrey'>(DD-MM-YYY)</Text>
            <InputField/>
        </Box>
    )
}
>>>>>>> adds help text and format text to label component

=======
=======
>>>>>>> fix merge conflict
import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme.js';
import InputField from './InputField.js';
import Text from '../Type/Text';
import Box from '../Box/Box';

//TEMPORARY TextInput
const TextInput = (props) => {
    return(
        <Box>
            <Text mb={0} fontSize={theme.fontSizes[1]} lineHeight={theme.lineHeights.smallTextBase}>I am helping</Text>
            <Text mb={0} fontSize='12px' lineHeight='16px' color='darkGrey'>(DD-MM-YYY)</Text>
            <InputField/>
        </Box>
    )
};

>>>>>>> adds help text and format text to label component
TextInput.defaultProps = {
  theme,
  p: 3,
};

export default TextInput;
