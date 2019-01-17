import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system'
import theme from '../theme.js'
import {decrementPx} from '../utils.js'

const InputField = styled.input`
    width: 100%
    border: 1px solid;
    border-color: ${theme.colors.blue}; 
    border-radius: ${theme.radii[1]};
    padding: ${decrementPx(theme.space[2])};
    line-height: 24px;
    font-size: ${theme.fontSizes[1]};
    font-family: ${theme.fonts.base};
    ${space}
`

//TEMPORARY TextInput
const TextInput = (props) => {
    return(
        <div>
            <InputField/>
        </div>
    )
}

export default TextInput
