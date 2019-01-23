import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily } from 'styled-system'
import theme from '../theme.js'
import Text from '../Type/Text.js'
import Box from '../Box/Box.js'

const Label = (props) =>{
    return(
        <Box {...props}>
            <Text display='inline' mb={0} fontSize={theme.fontSizes[1]}>{props.children}</Text>
            <Text display='inline' mb={0} ml={2} fontSize='12px' color='darkGrey'>{props.requirementText}</Text>
            <Text mb={0} fontSize={theme.fontSizes[0]} lineHeight={theme.lineHeights.smallTextBase}>{props.helpText}</Text>
            <Text mb={0} fontSize='12px' lineHeight='16px' color='darkGrey'>{props.formatText}</Text>
        </Box>
    )
}

Label.propTypes = {
    requirementText: PropTypes.oneOf(['(Optional)','(Required)']),
    helpText: PropTypes.string,
    formatText: PropTypes.string   
}

export default Label
