import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme'
import Icon from '../Icon/Icon.js';
import Text from '../Type/Text.js';
import Flex from '../Flex/Flex.js';
import icons from '../../icons/icons.json'

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    console.log(text)
    console.log(metrics.width);
    return metrics.width;
}

function getLeftDisplacement(text, font, padding){
  var width = getTextWidth(text, font)

  return `-${(width/2)+parseInt(padding.replace('.px',''))}px`
}


const labelVisibilityText = props => {
  switch (props.labelVisibility) {
    case 'always':
      return {
        display: 'block',
        fontWeight: props.theme.fontWeights[2]
      }
    case 'hover':
      return {
        display: 'none',
        position: 'absolute',
        fontSize: props.theme.fontSizes[0],
        fontWeight: props.theme.fontWeights[1],
        lineHeight: props.theme.lineHeights['smallTextCompressed'],
        padding: props.theme.space[1],
        zIndex: '10',
        top: '40px',
        left: '50%',
        marginLeft: getLeftDisplacement(props.label,`${props.theme.fontSizes[0]} IBM Plex Sans`,`${props.theme.space[1]}`),
        borderRadius: props.theme.radii[0],
        background: props.theme.colors['lightBlue'] ,
        pointerEvents: 'none'
      }
    default:
      return {
        display: 'block',
        fontWeight: props.theme.fontWeights[2]
      }
  }
}

const Wrapper = styled.button`
  background: transparent;
  border: none;
  position: relative;
  display: inline-flex;
  align-items: ${props => props.labelVisibility ? 'center' : null};

  padding: ${theme.space[1]} ${theme.space[0]};
  color: ${theme.colors['darkBlue']};
  cursor: ${props => props.disabled ? 'arrow' : 'pointer'};

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
      display: ${props => props.labelVisibility == 'hover' ? 'block' : null};
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
        display: ${props => props.labelVisibility == 'hover' ? 'none' : null};
      }
    }
  }
`

const IconicButton = (props) => {
  return (
    <Wrapper label={props.children} { ...props } >
      <Icon size={theme.space[5]} name={props.icon} p={1} />
      <Text mr={1} mb={0} ml={1}>{props.children}</Text>
    </Wrapper>
  )
}

export const names = Object.keys(icons)

IconicButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelVisibility: PropTypes.oneOf(["always","hover"]),
  icon: PropTypes.oneOf(names).isRequired
}

IconicButton.defaultProps = {
    theme: theme,
    labelVisibility: "hover"
}

export default IconicButton
