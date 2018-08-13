import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import sharedStyles from './sharedStyles';
import Button from "./Button";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import LinkButton from "./LinkButton";
import DisabledButton from "./DisabledButton";

storiesOf('Button', module)
  .add('Default', () => (<Button>Default Button</Button>))
  .add('Primary', () => <PrimaryButton onClick={action('clicked')}>Primary Button</PrimaryButton>)
  .add('Danger', () => (<DangerButton>Danger Button</DangerButton>));
  .add('Link', () => (<LinkButton>Link Button</LinkButton>))
  .add('Disabled', () => (<DisabledButton>Disabled Button</DisabledButton>))
