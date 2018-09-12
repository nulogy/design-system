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
  save: Save,
  search: Search,
  site: Domain,
  unlock: LockOpen,
  user: Person,
}

export const names = Object.keys(Svgs);

const iconSizeRatio = 1.25;

const Icons = {} 
names.map(name => Icons[name] = styled(Svgs[name])`
  height: ${iconSizeRatio}em;
  width: ${iconSizeRatio}em;
  top: 0;
  position: absolute;
`);

const Wrapper = styled.span`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: ${iconSizeRatio}em;

`;

const Icon = ({ name, IconSvg = Icons[name], ...props }) => (
  <Wrapper {...props} >
    <IconSvg />
  </Wrapper>
);

Icon.propTypes = {
  name: PropTypes.oneOf(names).isRequired
}

Icon.defaultProps = {}

export default Icon;
