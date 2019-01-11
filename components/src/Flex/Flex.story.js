import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box/Box';
import Flex from './Flex';

storiesOf('Flex', module)
  .add('Flex', () => (
    <Box bg='black' p={4} maxWidth={1040}>
      <Flex>
        <Box width={1/2} p={4} m={2} color='white' bg='blackBlue'>Box</Box>
        <Box width={1/2} p={4} m={2} color='white' bg='darkBlue'>Box</Box>
      </Flex>
    </Box>   
  )) 
;
