import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';
import QuietButton from './QuietButton';
import IconicButton from './IconicButton';

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
  .add('IconicButton', () => (
    <React.Fragment>
      <IconicButton labelVisibility='visible'>Delete</IconicButton>
      <IconicButton labelVisibility='hidden'>Delete</IconicButton>
      <IconicButton labelVisibility='visible'>I am Iconic Button with really really really long label</IconicButton>
      <IconicButton labelVisibility='visible' disabled >Delete</IconicButton>
      <IconicButton labelVisibility='hidden' disabled >Delete</IconicButton>
      <IconicButton labelVisibility='hidden'>AA</IconicButton>
      <IconicButton labelVisibility='hidden'>AAAA</IconicButton>
      <IconicButton labelVisibility='hidden'>AAAAAA</IconicButton>
      <IconicButton labelVisibility='hidden'>|</IconicButton>
      <span>Delete</span>
    </React.Fragment>
  ))
  .add('With a selected size', () => (
    <React.Fragment>
     <Button size="small">Create project</Button>
     <Button size="medium">Create project</Button>
     <Button size="large">Create project</Button>
   </React.Fragment>
  ))
  .add('With a selected Icon', () => (
    <React.Fragment>
      <Button iconName="add" iconSide="left">Create project</Button>
      <Button iconName="add" iconSide="right">Create project</Button>
    </React.Fragment>
  ))
  .add('Set to full width', () => (
    <PrimaryButton fullWidth>Create project</PrimaryButton>
  ))
  .add('Set to disabled', () => (
    <PrimaryButton disabled>Create project</PrimaryButton>
  ))
;
