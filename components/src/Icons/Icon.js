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

const iconSizeRatio = 1.5; '' /* Large - 1.2; Small - 1.143; */

const Icons = {}
names.map(name => Icons[name] = styled(Svgs[name])`
  height: ${iconSizeRatio}rem;
  width: ${iconSizeRatio}rem;
  top: 0;
  position: absolute;
`);

const Wrapper = styled.span`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: ${iconSizeRatio}rem;
  width: ${iconSizeRatio}rem;
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
