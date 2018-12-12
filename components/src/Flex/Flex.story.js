import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box/Box';
import Flex from './Flex';

storiesOf('Layout/Flex', module)
  .add('Default', () => (
    <Box bg='black' maxWidth={1040}>
      <Flex>
        <Box width={1/2} p={4} m={2} color='white' bg='blackBlue'>
        </Box>
        <Box width={1/2} p={8} m={2} bg='lightGreen'>Box</Box>
      </Flex>
    </Box>   
  )) 
;
