import React from 'react';
import styled from 'styled-components';
import { color, space, width, maxWidth, borderRadius, textAlign } from 'styled-system'
import theme from '../theme'
import Button from './Button';
import Text from '../Type/Text.js';

const IconicButton = ({ ...props }) => {
  return (
    <React.Fragment>
        <Button></Button>
        <Text>Hey</Text>
    </React.Fragment>
  )
}

export default IconicButton
