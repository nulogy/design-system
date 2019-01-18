import React from 'react';
import { storiesOf } from '@storybook/react';
import IconicButton from './IconicButton';

storiesOf('IconicButton', module)
  .add('With label', () => (
    <IconicButton labelVisibility='visible'>Delete</IconicButton>
  ))
  .add('Without label', () => (
    <IconicButton labelVisibility='hidden'>Delete</IconicButton>
  ))
  .add('With a long label', () => (
    <IconicButton labelVisibility='visible'>I am Iconic Button with really really really long label</IconicButton>
  ))
  .add('Disabled', () => (
    <React.Fragment>
      <IconicButton>Delete</IconicButton>
      <IconicButton labelVisibility='visible' disabled >Delete</IconicButton>
      <IconicButton labelVisibility='hidden' disabled >Delete</IconicButton>
    </React.Fragment>
  ));
