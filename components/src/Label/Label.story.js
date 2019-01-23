import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './Label';

storiesOf('Label', module)
  .add('Label', () => (
    <Label>Default label</Label>
  ))
  .add('With requirement text', () => (
    <Label requirementText='(Optional)'>Default label</Label>
  ))
  .add('With help text', () => (
    <Label helpText = 'Enter a date below'>Default label</Label>
  ))
  .add('With format text', () => (
    <Label formatText='(DD-MM-YYYY)'>Default label</Label>
  ))
  .add('With all additional text', () => (
    <Label requirementText='(Optional)' helpText = 'Enter a date below' formatText='(DD-MM-YYYY)'>
    Default label
    </Label>
  ))
  .add('With a long text', () => (
    <Label helpText = 'Really long help text Really long help text Really long help text Really long help text Really long help text Really long help text.' requirementText='(Optional)'>With a really really really really really really really really long label</Label>
  ));
