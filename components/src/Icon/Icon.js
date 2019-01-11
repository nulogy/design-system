import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WebFont from 'webfontloader';
import { color, space } from 'styled-system'
import './MaterialDesignIcons.css';

export const Svgs = {
  add: "add",
  building: "domain",
  cancel: "cancel",
  check: "check",
  delete: "delete",
  edit: "edit",
  lock: "lock",
  menu: "menu",
  save: "save",
  search: "search",
  unlock: "lock_open",
  user: "person",
}

export const names = Object.keys(Svgs);

WebFont.load({
  google: {
      families: ['Material+Icons']
  },
  timeout:5000,
})

const Icon = styled.span.attrs({
  'aria-hidden': props => (props.title==null? true:false),
  children: props => Svgs[props.name],
  style: {
    fontFamily: 'Material Icons',
    position: 'relative',
    top:'0.125em'
  }
})`
  ${color}
  ${space}
  font-size: ${props => props.size};
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
`

Icon.propTypes = {
  name: PropTypes.string.isRequired,  
  title: PropTypes.string,
  size: PropTypes.number,
  ...color.propTypes,
  ...space.propTypes
}

export default Icon;