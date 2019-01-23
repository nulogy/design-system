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
            <Text display='inline' mb={0} fontSize={theme.fontSizes[1]} color='black'>{props.children}</Text>
            <Text display='inline' mb={0} ml={2} fontSize={theme.fontSizes[0]} color='darkGrey'>{props.subtext}</Text>
        </Box>
    )
}

Label.propTypes = {
    subtext: PropTypes.oneOf(['(Optional)','(Required)'])
}

export default Label
