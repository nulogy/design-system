import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './Label';

storiesOf('Label', module)
  .add('Label', () => (
    <Label>Default label</Label>
  ))
  .add('With a subtext', () => (
    <Label subtext='(Optional)'>Default label</Label>
  ))
  .add('With a long label', () => (
    <Label subtext='(Optional)'>With a really really really really really really really really long label</Label>
  ))
  .add('TESTING REMOVE THIS', () => (
    <React.Fragment>
        <Label>Default label</Label>
        <Label subtext='(Optional)'>Default label</Label>
    </React.Fragment>
  ));
