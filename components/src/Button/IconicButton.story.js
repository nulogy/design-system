import React from 'react';
import { storiesOf } from '@storybook/react';
import IconicButton from './IconicButton';

storiesOf('IconicButton', module)
  .add('With visible label', () => (
    <IconicButton icon='delete' labelVisibility='always'>Delete</IconicButton>
  ))
  .add('With hidden label', () => (
    <React.Fragment>
      <IconicButton icon='edit' >Edit</IconicButton>
      <IconicButton icon='delete' labelVisibility='hover'>Delete</IconicButton>
    </React.Fragment>
  ))
  .add('With a long label', () => (
    <React.Fragment>
      <IconicButton icon='user' labelVisibility='always'>I am an Iconic Button with a really really really long label</IconicButton>
      <IconicButton ml={200} icon='user' labelVisibility='hover'>I am an Iconic Button with a really really really long label</IconicButton>
    </React.Fragment>
  ))
  .add('Disabled', () => (
    <React.Fragment>
      <IconicButton icon='cancel' labelVisibility='always' disabled >Cancel</IconicButton>
      <IconicButton icon='lock' labelVisibility='hover' disabled >Lock</IconicButton>
    </React.Fragment>
  ));
