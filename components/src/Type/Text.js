// To-Do: Add small variant

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, space, fontSize, fontWeight, lineHeight } from 'styled-system'

const Text = styled.div`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
}

export default Text
