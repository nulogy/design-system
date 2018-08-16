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
  .add('Default', () => (<Button>Default Button</Button>))
  .add('Primary', () => <PrimaryButton onClick={action('clicked')}>Primary Button</PrimaryButton>)
  .add('Approval', () => (<ApprovalButton>Approval Button</ApprovalButton>))
  .add('Danger', () => (<DangerButton>Danger Button</DangerButton>))
  .add('Disabled', () => (<DisabledButton disabled>Disabled Button</DisabledButton>))
  .add('Link', () => (<LinkButton>Link Button</LinkButton>))
  .add('Create', () => (<CreateButton>+</CreateButton>))
  .add('Trigger', () => (<TriggerButton>Trigger Button</TriggerButton>))
  .add('Ghost', () => (<GhostButton>Ghost Button</GhostButton>))
  .add('Small', () => (<SmallButton>Small Button</SmallButton>))
  .add('Large', () => (<LargeButton>Large Button</LargeButton>))
  .add('FullWidth', () => (<FullWidthButton>Full Width Button</FullWidthButton>));
  .add('Action', () => <ActionButton onClick={action('clicked')}>+</ActionButton>)
