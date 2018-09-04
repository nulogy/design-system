import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Border = styled.span`
  font-size: 120px;
  border: .15em dashed red;
  display: block;
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background-color: pink;
  text-align: center;
  line-height: 2em;
`;

const Icon = props => <Border>🐮</Border>
Icon.propTypes = {}

Icon.defaultProps = {}

export default Icon;
