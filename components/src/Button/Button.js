import styled from 'styled-components';
import { color, space, width, maxWidth, boxShadow, borderRadius, textAlign } from 'styled-system'
import theme from '../theme'
import Icon, {names} from '../Icon/Icon.js'
import React from 'react'
import PropTypes from 'prop-types';
import {addPx, subPx, multPx} from '../utils.js';

const size = props => {
    switch (props.size) {
      case 'small':
        return {
          fontSize: `${props.theme.fontSizes[0]}`,
          lineHeight: `${props.theme.lineHeights.smallTextCompressed}`,
          padding: `${subPx(props.theme.space[1])} ${props.theme.space[2]}`
        }
      case 'medium':
        return {
          fontSize: `${props.theme.fontSizes[1]}`,
          padding: `${subPx(props.theme.space[2],1)} ${props.theme.space[3]}`
        }
      case 'large':
        return {
          fontSize: `${props.theme.fontSizes[2]}`,
          lineHeight: `${props.theme.lineHeights.subsectionTitle}`,
          padding: `${subPx(props.theme.space[3])} ${props.theme.space[4]}`

        }
      default:
        return {
            fontSize: `${props.theme.fontSizes[1]}`,
            padding: `${subPx(props.theme.space[2])} ${props.theme.space[3]}`
        }
    }
  }

const fullWidth = props => (props.fullWidth ? { width: '100%' } : null)

const BaseButton = ({fullWidth, children, iconSide, iconName, ...props}) => {
  return(
    <button {...props}> 
      {(iconName && iconSide === "left") &&
        <Icon style={{minWidth: `${props.theme.lineHeights.smallTextCompressed}em`}} size={props.theme.lineHeights.smallTextCompressed+'em'} mr={1} name={iconName}/>
      }
      {children}
      {(iconName && iconSide === "right") &&
        <Icon style={{minWidth: `${props.theme.lineHeights.smallTextCompressed}em`}} size={props.theme.lineHeights.smallTextCompressed+'em'} ml={1} name={iconName}/>
      }
    </button>
  )
}

const Button = styled(BaseButton)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    -webkit-font-smoothing: antialiased;
    font-weight: ${props => props.theme.fontWeights[2]};
    border: 0;
    text-decoration: none;
    vertical-align: middle;
    line-height: ${props => props.theme.lineHeights.base};
    transition: .2s;
    cursor: ${props => props.disabled ? 'arrow' : 'pointer'}};
    color: ${props => props.theme.colors['blue']};
    border: 1px solid ${props => props.theme.colors['darkBlue']};
    border-radius: ${props => props.theme.radii[1]};

    ${fullWidth} ${size} ${space};

    &:hover {
      background-color: ${props => props.disabled ? null : props.theme.colors.lightBlue};
    }
    &:focus {outline: none;}
    &:active {transform: scale(0.98); transition: .2s ease-in;}
    &:disabled {opacity: .5;}
`
Button.propTypes = {
  size: PropTypes.oneOf(["small","medium","large"]),  
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconName: PropTypes.oneOf(names),
  iconSide: PropTypes.oneOf(["left","right"]),
  ...space.propTypes
}

Button.defaultProps = {
    theme: theme,
    iconSide: "right"
}

export default Button
