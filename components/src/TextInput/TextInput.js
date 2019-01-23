import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import theme from '../theme.js';
import InputField from './InputField.js';
import Text from '../Type/Text';
import Box from '../Box/Box';
=======
import theme from '../theme.js'
import InputField from './InputField.js'
import Text from '../Type/Text'
import Box from '../Box/Box'
>>>>>>> 8dac71d64d0687e499151fe8db2ccdf824b9f0b5

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

TextInput.defaultProps = {
  theme,
  p: 3,
};

export default TextInput;
