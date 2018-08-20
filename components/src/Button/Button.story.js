import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Button from "./Button";
import ApprovalButton from "./ApprovalButton";
import DangerButton from "./DangerButton";
import DisabledButton from "./DisabledButton";
import SmallButton from "./SmallButton";
import LargeButton from "./LargeButton";

storiesOf('Button', module)
  .add('Button', () => <Button onClick={action('clicked')}>Default Button</Button>)
  .add('With an icon', () => <Button onClick={action('clicked')}>➕</Button>)
  .add('With an icon and text', () => <Button onClick={action('clicked')}>✏️ Edit this thing</Button>)
  
  .add('Submit', () => <Button type="submit" onClick={action('clicked')}>Default Button</Button>)
  
  .add('Approval', () => <ApprovalButton onClick={action('clicked')}>Approval Button</ApprovalButton>)
  .add('Danger', () => <DangerButton onClick={action('clicked')}>Danger Button</DangerButton>)
  .add('Disabled', () => <DisabledButton disabled onClick={action('clicked')}>Disabled Button</DisabledButton>)
  .add('Small', () => <SmallButton onClick={action('clicked')}>Small Button</SmallButton>)
  .add('Large', () => <LargeButton onClick={action('clicked')}>Large Button</LargeButton>)
