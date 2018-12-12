import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from './Box';

storiesOf('Layout/Box', module)
  .add('Box', () => (
    <div>
      <Box color='white' mb='3' p='4' bg='blackBlue'>
        I'm a box! I can accept a text color, a background color, alignment or spacing props.
      </Box>
    </div>    
  )) 
;