import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Button from "./Button";
import ApprovalButton from "./ApprovalButton";
import DangerButton from "./DangerButton";

storiesOf('Button', module)
  .add('Default', () => <Button onClick={action('clicked')}>Default Button</Button>)
  .add('Submit', () => <Button type="submit" onClick={action('clicked')}>Submit Button</Button>)
  .add('With an icon', () => <Button onClick={action('clicked')}>➕</Button>)
  .add('With an icon and text', () => <Button onClick={action('clicked')}>✏️ Edit this thing</Button>)
  .add('Disabled', () => <Button disabled onClick={action('clicked')}>Disabled Button</Button>)
  .add('Small', () => <Button size="small" onClick={action('clicked')}>Small Button</Button>)
  .add('Large', () => <Button size="large" onClick={action('clicked')}>Large Button</Button>)
  .add('Danger', () => <DangerButton onClick={action('clicked')}>Danger Button</DangerButton>)

storiesOf('Primary Button', module)
  .add('Default', () => <Button type="submit" onClick={action('clicked')}>Default Button</Button>)
  .add('With an icon', () => <Button type="submit" onClick={action('clicked')}>➕</Button>)
  .add('With an icon and text', () => <Button type="submit" onClick={action('clicked')}>✏️ Edit this thing</Button>)
  .add('Disabled', () => <Button type="submit" disabled onClick={action('clicked')}>Disabled Button</Button>)
  .add('Small', () => <Button type="submit" size="small" onClick={action('clicked')}>Small Button</Button>)
  .add('Large', () => <Button type="submit" size="large" onClick={action('clicked')}>Large Button</Button>)

storiesOf('Approval Button', module)
  .add('Default', () => <ApprovalButton onClick={action('clicked')}>Default Button</ApprovalButton>)
  .add('Submit', () => <ApprovalButton type="submit" onClick={action('clicked')}>Submit Button</ApprovalButton>)
  .add('With an icon', () => <ApprovalButton onClick={action('clicked')}>➕</ApprovalButton>)
  .add('With an icon and text', () => <ApprovalButton onClick={action('clicked')}>✏️ Edit this thing</ApprovalButton>)
  .add('Disabled', () => <ApprovalButton disabled onClick={action('clicked')}>Disabled Button</ApprovalButton>)
  .add('Small', () => <ApprovalButton size="small" onClick={action('clicked')}>Small Button</ApprovalButton>)
  .add('Large', () => <ApprovalButton size="large" onClick={action('clicked')}>Large Button</ApprovalButton>)

storiesOf('Danger Button', module)
  .add('Default', () => <DangerButton onClick={action('clicked')}>Default Button</DangerButton>)
  .add('Submit', () => <DangerButton type="submit" onClick={action('clicked')}>Submit Button</DangerButton>)
  .add('With an icon', () => <DangerButton onClick={action('clicked')}>➕</DangerButton>)
  .add('With an icon and text', () => <DangerButton onClick={action('clicked')}>✏️ Edit this thing</DangerButton>)
  .add('Disabled', () => <DangerButton disabled onClick={action('clicked')}>Disabled Button</DangerButton>)
  .add('Small', () => <DangerButton size="small" onClick={action('clicked')}>Small Button</DangerButton>)
  .add('Large', () => <DangerButton size="large" onClick={action('clicked')}>Large Button</DangerButton>)
