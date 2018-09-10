import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { 
  AddCircle,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Lock,
  LockOpen,
  Save,
} from 'rmdi';

const IconNames = {
  add: AddCircle,
  cancel: Cancel,
  check: CheckCircle,
  delete: Delete,
  edit: Edit,
  lock: Lock,
  save: Save,
  unlock: LockOpen,
}

export const names = Object.keys(IconNames);

const iconSizeRatio = 1.25;

const Icons = {} 
names.map(name => Icons[name] = styled(IconNames[name])`
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
