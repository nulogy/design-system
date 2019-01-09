import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';
import QuietButton from './QuietButton';


storiesOf('Buttons', module)
  .add('Button', () => (
      <Button>Create project</Button>
  ))  
  .add('PrimaryButton', () => (
    <PrimaryButton>Create project</PrimaryButton>
  )) 
  .add('DangerButton', () => (
    <DangerButton>Delete project</DangerButton>
  ))  
  .add('QuietButton', () => (
    <QuietButton>Create project</QuietButton>
  ))  
  .add('Sizes', () => (
    <React.Fragment>
     <Button size="small">Create project</Button>
     <Button size="medium">Create project</Button>
     <Button size="large">Create project</Button>
   </React.Fragment>
  ))
  .add('Full width', () => (
    <PrimaryButton fullWidth>Create project</PrimaryButton>
  )) 
  .add('Disabled', () => (
    <PrimaryButton disabled>Create project</PrimaryButton>
  ))                  
;