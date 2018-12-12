// BUG : Default icons @ 16px do not track text anymore, see in storybook */ 

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Add,
  Cancel,
  Check,
  Delete,
  Domain,
  Edit,
  Lock,
  LockOpen,
  Menu,
  Person,
  Save,
  Search,
} from 'rmdi';

export const Svgs = {
  add: Add,
  cancel: Cancel,
  check: Check,
  company: Domain,
  delete: Delete,
  edit: Edit,
  lock: Lock,
  menu: Menu,
  save: Save,
  search: Search,
  site: Domain,
  unlock: LockOpen,
  user: Person,
}

export const names = Object.keys(Svgs);

const lineHeight = name => font.lineHeight[name] * font.size.medium;

export const iconSizeRatio = 1.25;

export const iconSizeRatioForLineHeight = 
  lineHeight => 
  ({ theme }) => 
    (iconSizeRatio / theme.font.lineHeight.ratio[lineHeight]);

const Icons = {}
names.map(name => Icons[name] = styled(Svgs[name])`
  height: ${iconSizeRatio}em;
  width: ${iconSizeRatio}em;
  top: 0;
  position: absolute;
`);

export const Wrapper = styled.span`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: ${iconSizeRatio}em;
`;

const Icon = ({ name, IconSvg = Icons[name], ...props }) => (
  <Wrapper {...props} >
      <IconSvg title={props.title} aria-hidden={!props.title} />
  </Wrapper>
);

Icon.propTypes = {
  name: PropTypes.oneOf(names).isRequired,
  title: PropTypes.string
}

Icon.defaultProps = {}

export default Icon;
