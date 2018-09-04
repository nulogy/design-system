import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as MaterialIcons from 'rmdi';

const SvgIcon = MaterialIcons.Icon.default;

const iconNames = Object.keys(MaterialIcons);

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

const Icon = ({ name }) => (
  <Wrapper>
    <SvgIcon  name={name} />
  </Wrapper>
);

Icon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired
}

Icon.defaultProps = {}

export default Icon;
