import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import Box from './Box';

storiesOf('Box', module)
  .add('Box component', withInfo({
    inline: false
  })(() => (
    <Box p={3}>
      Hello World
    </Box>
  )))
  .add('With a text colour', () => (
    <Box p={3} color='blue'>
      Hello World
    </Box>
  ))
  .add('With a background colour', () => (
    <Box p={3} color='white' bg='blue'>
     Hello World
    </Box>
  ))
  .add('With a set width', () => (
    <Box
      p={3}
      width={1/2}
      bg='whiteGrey'>
      Half Width
    </Box>
  ))
  .add('With padding', () => (
    <Box p={3}>
      <Box m={1} p={3} bg='whiteGrey'>Padding</Box>
      <Box m={1} pt={3} bg='whiteGrey'>Padding top</Box>
      <Box m={1} pr={3} bg='whiteGrey'>Padding right</Box>
      <Box m={1} pb={3} bg='whiteGrey'>Padding bottom</Box>
      <Box m={1} pl={3} bg='whiteGrey'>Padding left</Box>
      <Box m={1} px={3} bg='whiteGrey'>Padding x</Box>
      <Box m={1} py={3} bg='whiteGrey'>Padding y</Box>
    </Box>
  ))
  .add('With margin', () => (
    <Box p={3}>
      <Box m={3} bg='whiteGrey'>Margin</Box>
      <Box mt={3} bg='whiteGrey'>Margin top</Box>
      <Box mr={3} bg='whiteGrey'>Margin right</Box>
      <Box mb={3} bg='whiteGrey'>Margin bottom</Box>
      <Box ml={3} bg='whiteGrey'>Margin left</Box>
      <Box mx={3} bg='whiteGrey'>Margin x</Box>
      <Box my={3} bg='whiteGrey'>Margin y</Box>
    </Box>
  ))
  .add('With a shadow', () => (
    <Box boxShadow={0}>Shadow</Box>
  ))  