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

TextInput.defaultProps = {
    theme: theme,
    p: 3
}

export default TextInput
