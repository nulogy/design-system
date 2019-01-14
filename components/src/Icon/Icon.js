import React from 'react'
import './icons.svg'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system'

export const names = [
  "add",
  "building",
  "cancel",
  "check",
  "delete",
  "edit",
  "lock",
  "menu",
  "save",
  "search",
  "unlock",
  "user"
];

const iconSizeRatio = 1.25;

export const Svg = (props) => (
  <svg 
    aria-hidden={props.title==null? true:false}
    height={props.size} 
    width={props.size} 
    fill={props.fill} 
      {...props}
  >
    <use xlinkHref={`#icons_${props.name}`} />
  </svg>
)

const CenteredIcon = styled(Svg)`
  top: 0;
  position: absolute;
`

const IconContainer = styled.span`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: ${iconSizeRatio}em;
  ${space}
`

const Icon = ({title,fill,color,name, ...space}) => (
  <IconContainer {...space}>
    <CenteredIcon 
      title={title} 
      fill={fill||color||"currentColor"} 
      size={iconSizeRatio+'em'}
      name={name}
    />
  </IconContainer>
)

Icon.propTypes = {
  name: PropTypes.oneOf(names).isRequired,  
  title: PropTypes.string,
  fill: PropTypes.string,
  color: PropTypes.string,
  ...space.propTypes
}

export default Icon
