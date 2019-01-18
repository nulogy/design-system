import React from 'react';
import { storiesOf } from '@storybook/react';
import IconicButton from './IconicButton';

storiesOf('IconicButton', module)
  .add('With label', () => (
    <IconicButton icon='delete' labelVisibility='visible'>Delete</IconicButton>
  ))
  .add('Without label', () => (
    <React.Fragment>
      <IconicButton icon='edit' >Edit</IconicButton>
      <IconicButton icon='delete' labelVisibility='hidden'>Delete</IconicButton>
    </React.Fragment>
  ))
  .add('With a long label', () => (
    <IconicButton icon='user' labelVisibility='visible'>I am Iconic Button with really really really long label</IconicButton>
  ))
  .add('Disabled', () => (
    <React.Fragment>
      <IconicButton icon='cancel' labelVisibility='visible' disabled >Cancel</IconicButton>
      <IconicButton icon='lock' labelVisibility='hidden' disabled >Lock</IconicButton>
    </React.Fragment>
  ));
