import React from 'react';
import styled from 'styled-components';
//import { color, space, width, maxWidth, borderRadius, textAlign } from 'styled-system'
import theme from '../theme'
import Icon from '../Icon/Icon.js';
import Text from '../Type/Text.js';
import Flex from '../Flex/Flex.js';

const Wrapper = styled.button`
  background: transparent;
  border: none;
  padding: ${theme.space[1]} ${theme.space[0]};
  display: flex;
  align-items: center;
  color: ${theme.colors['darkBlue']};
  cursor: ${props => props.disabled ? 'arrow' : 'pointer'}};
  ${Icon} {
    border-radius: 50%;
  }
  ${Text} {
  }
  &:hover{
    ${Icon} {
        background ${theme.colors['lightBlue']};
    }
  }
  &:focus {outline: none;}
  &:active {
    ${Icon} {
      transform: scale(0.875); transition: .2s ease-in;}
    }
  }
  &:disabled {opacity: .5;}
`

const IconicButton = ({ ...props }) => {
  return (
    <Wrapper>
      <Icon size={theme.space[5]} name='delete' mr={1} p={1} />
      <Text mb={0} mr={1}>Delete</Text>
    </Wrapper>
  )
}

export default IconicButton
