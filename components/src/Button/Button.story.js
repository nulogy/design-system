import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import sharedStyles from './sharedStyles';
import Button from "./Button";
import PrimaryButton from "./PrimaryButton";
import ApprovalButton from "./ApprovalButton";
import DangerButton from "./DangerButton";
import DisabledButton from "./DisabledButton";
import LinkButton from "./LinkButton";
import CreateButton from "./CreateButton";
import ActionButton from "./ActionButton";
import TriggerButton from "./TriggerButton";
import GhostButton from "./GhostButton";
import SmallButton from "./SmallButton";
import LargeButton from "./LargeButton";
import FullWidthButton from "./FullWidthButton";

storiesOf('Button', module)
  .add('Default', () => <Button onClick={action('clicked')}>Default Button</Button>)
  .add('Primary', () => <PrimaryButton onClick={action('clicked')}>Primary Button</PrimaryButton>)
  .add('Approval', () => <ApprovalButton onClick={action('clicked')}>Approval Button</ApprovalButton>)
  .add('Danger', () => <DangerButton onClick={action('clicked')}>Danger Button</DangerButton>)
  .add('Disabled', () => <DisabledButton disabled>Disabled Button</DisabledButton>)
  .add('Link', () => <LinkButton onClick={action('clicked')}>Link Button</LinkButton>)
  .add('Create', () => <CreateButton onClick={action('clicked')}>+</CreateButton>)
  .add('Action', () => <ActionButton onClick={action('clicked')}>+</ActionButton>)
  .add('Trigger', () => <TriggerButton onClick={action('clicked')}><span className="label">Trigger Button</span><span className="icon">i</span></TriggerButton>)
  .add('Ghost', () => <GhostButton onClick={action('clicked')}>Ghost Button</GhostButton>)
  .add('Small', () => <SmallButton onClick={action('clicked')}>Small Button</SmallButton>)
  .add('Large', () => <LargeButton onClick={action('clicked')}>Large Button</LargeButton>)
  .add('FullWidth', () => <FullWidthButton onClick={action('clicked')}>Full Width Button</FullWidthButton>);
