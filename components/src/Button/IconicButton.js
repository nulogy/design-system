import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme'
import Icon from '../Icon/Icon.js';
import Text from '../Type/Text.js';
import Flex from '../Flex/Flex.js';

const labelVisibility = props => {
    switch (props.labelVisibility) {
      case 'visible':
        return {
          display: 'flex',
          alignItems: 'center'
        }
      case 'hidden':
        return {
          display: 'block'
        }
      default:
        return {
          display: 'flex',
          alignItems: 'center'
        }
    }
  }

const Wrapper = styled.button`
  background: transparent;
  border: none;
  position: relative;
  padding: ${theme.space[1]} ${theme.space[0]};
  color: ${theme.colors['darkBlue']};
  cursor: ${props => props.disabled ? 'arrow' : 'pointer'};

  ${labelVisibility}

  ${Icon} {
    border-radius: 50%;
    transition: .2s;
    min-width: 32px;
  }
  ${Text} {
    display: ${props => props.label && props.labelVisibility == 'visible' ? 'block' : 'none'};
    position: ${props => props.labelVisibility == 'hidden' ? 'absolute' : null};
    font-size: ${props => props.labelVisibility == 'hidden' ? props.theme.fontSizes[0] : null};
    font-weight: ${props => props.labelVisibility == 'visible' ? '600' : '400'};
    line-height: ${props => props.labelVisibility == 'hidden' ? props.theme.colors['smallTextCompressed'] : null};
    text-align: left;
    padding: ${props => props.labelVisibility == 'hidden' ? props.theme.space[1] : null};
    z-index: ${props => props.labelVisibility == 'hidden' ? '10' : null};
    top: ${props => props.labelVisibility == 'hidden' ? '40px' : null};
    left: ${props => props.labelVisibility == 'hidden' ? '-12px' : null}; // hard coded, needs function
    border-radius: ${props => props.labelVisibility == 'hidden' ? props.theme.radii[0] : null};
    background: ${props => props.labelVisibility == 'hidden' ? props.theme.colors['lightBlue'] : null};
    pointer-events: ${props => props.labelVisibility == 'hidden' ? 'none' : null};
  }
  &:hover{
    ${Icon} {
        background ${theme.colors['lightBlue']};
    }
    ${Text} {
      display: ${props => props.label && props.labelVisibility == 'hidden' ? 'block' : null};
    }
  }
  &:focus {outline: none;}
  &:active {
    ${Icon} {
      transform: scale(0.875); transition: .2s ease-in;}
    }
  }
  &:disabled {
    opacity: .5;
    &:hover, &:active {
      ${Icon} {
        background: none;
        transform: none;
      }
      ${Text} {
        display: ${props => props.label && props.labelVisibility == 'hidden' ? 'none' : null};
      }
    }
  }
`

const IconicButton = (props) => {
  return (
    <Wrapper { ...props } >
      <Icon size={theme.space[5]} name='delete' p={1} />
      <Text mr={1} mb={0} ml={1}>{props.label}</Text>
    </Wrapper>
  )
}

IconicButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string
}

export default IconicButton
