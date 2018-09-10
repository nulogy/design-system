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

const Icons = {
  add: AddCircle,
  cancel: Cancel,
  check: CheckCircle,
  delete: Delete,
  edit: Edit,
  lock: Lock,
  save: Save,
  unlock: LockOpen,
}

const Wrapper = styled.span`
  border: .15em dashed red;
  display: block;
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background-color: pink;
  text-align: center;
  line-height: 2em;
`;

export const names = Object.keys(Icons);

const Icon = ({ name, IconSvg = Icons[name] }) => (
  <Wrapper>
    <IconSvg />
  </Wrapper>
);

Icon.propTypes = {
  name: PropTypes.oneOf(names).isRequired
}

Icon.defaultProps = {}

export default Icon;
