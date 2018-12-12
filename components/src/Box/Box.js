import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, space, width, fontSize, maxWidth } from 'styled-system'
import * as tokens from '../../../tokens/build/exports.js';

const Box = styled.div`
 ${color}
 ${space}
 ${width}
 ${maxWidth}
`;

Box.propTypes = {
    ...space.propTypes,
    ...width.propTypes,
    ...color.propTypes,
    ...maxWidth.propTypes,    
  }
  
export default Box

