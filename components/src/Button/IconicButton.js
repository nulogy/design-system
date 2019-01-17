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
          alignItems: 'center'
        }
      case 'hidden':
        return {
        }
      default:
        return {
          alignItems: 'center'
        }
    }
  }

const labelVisibilityText = props => {
  switch (props.labelVisibility) {
    case 'visible':
      return {
        display: 'block',
        fontWeight: '600'
      }
    case 'hidden':
      return {
        display: 'none',
        position: 'absolute',
        fontSize: props.theme.fontSizes[0],
        fontWeight: '400',
        lineHeight: props.theme.colors['smallTextCompressed'],
        padding: props.theme.space[1],
        zIndex: '10',
        top: '40px',
        left: '-12px',
        borderRadius: props.theme.radii[0],
        background: props.theme.colors['lightBlue'] ,
        pointerEvents: 'none'
      }
    default:
      return {
        display: 'block',
        fontWeight: '600'
      }
  }
}

const Wrapper = styled.button`
  background: transparent;
  border: none;
  position: relative;
  display: inline-flex;
  alignItems: ${props => props.disabled ? 'arrow' : 'pointer'};

  padding: ${theme.space[1]} ${theme.space[0]};
  color: ${theme.colors['darkBlue']};
  cursor: ${props => props.disabled ? 'center' : null};

  ${labelVisibility}

  ${Icon} {
    border-radius: 50%;
    transition: .2s;
    min-width: 32px;
  }
  ${Text} {
    ${labelVisibilityText}
    text-align: left;
  }
  &:hover{
    ${Icon} {
        background ${theme.colors['lightBlue']};
    }
    ${Text} {
      display: ${props => props.labelVisibility == 'hidden' ? 'block' : null};
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
        display: ${props => props.labelVisibility == 'hidden' ? 'none' : null};
      }
    }
  }
`

const IconicButton = (props) => {
  console.log(props.children);
  return (
    <Wrapper { ...props } >
      <Icon size={theme.space[5]} name='delete' p={1} />
      <Text mr={1} mb={0} ml={1}>{props.children}</Text>
    </Wrapper>
  )
}

IconicButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string
}

export default IconicButton
