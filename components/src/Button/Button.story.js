import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Button from "./Button";
import ApprovalButton from "./ApprovalButton";
import DangerButton from "./DangerButton";
import LinkButton from "./LinkButton";

const Nbsp = () => <React.Fragment>{" "}</React.Fragment>;

storiesOf('Buttons / Examples', module)
  .add('All Buttons', () => (
    <React.Fragment>
      <Button onClick={action('clicked')}>Button</Button>
      <Nbsp />
      <ApprovalButton onClick={action('clicked')}>Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton onClick={action('clicked')}>Danger Button</DangerButton>
      <Nbsp />
      <Button type="submit" onClick={action('clicked')}>Primary Button</Button>
      <Nbsp />
      <ApprovalButton type="submit" onClick={action('clicked')}>Primary Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton type="submit" onClick={action('clicked')}>Primary Danger Button</DangerButton>
      <Nbsp />
      <LinkButton type="submit" onClick={action('clicked')}>Primary Link Button</LinkButton>
    </React.Fragment>
  ))
  .add('Some Actions', () => (
    <div>
      <h1>Some thing</h1>
      <p>Sed at sapien nibh. Donec urna turpis</p>
      <p>feugiat sed nisi vel, maximus euismod lorem. Etiam ac lobortis ex, vitae suscipit magna.</p>
      <DangerButton onClick={action('clicked')}>Delete</DangerButton>
      <Nbsp />
      <Button onClick={action('clicked')}>Cancel</Button>
      <Nbsp />
      <Button type="submit" onClick={action('clicked')}>Save</Button>
    </div>
  ))
  .add('Delete Dialog', () => (
    <div>
      <h1>Are you sure you want to delete?</h1>
      <Button onClick={action('clicked')}>Cancel</Button>
      <Nbsp />
      <DangerButton type="submit" onClick={action('clicked')}>Delete</DangerButton>
    </div>
  ))

storiesOf('Buttons / Button', module)
  .add('Default', () => <Button onClick={action('clicked')}>Default Button</Button>)
  .add('Submit', () => <Button type="submit" onClick={action('clicked')}>Submit Button</Button>)
  .add('With an icon', () => <Button onClick={action('clicked')}>➕</Button>)
  .add('With an icon and text', () => <Button onClick={action('clicked')}>✏️ Edit this thing</Button>)
  .add('Disabled', () => <Button disabled onClick={action('clicked')}>Disabled Button</Button>)
  .add('Small', () => <Button size="small" onClick={action('clicked')}>Small Button</Button>)
  .add('Large', () => <Button size="large" onClick={action('clicked')}>Large Button</Button>)

storiesOf('Buttons / Primary Button', module)
  .add('Default', () => <Button type="submit" onClick={action('clicked')}>Default Button</Button>)
  .add('With an icon', () => <Button type="submit" onClick={action('clicked')}>➕</Button>)
  .add('With an icon and text', () => <Button type="submit" onClick={action('clicked')}>✏️ Edit this thing</Button>)
  .add('Disabled', () => <Button type="submit" disabled onClick={action('clicked')}>Disabled Button</Button>)
  .add('Small', () => <Button type="submit" size="small" onClick={action('clicked')}>Small Button</Button>)
  .add('Large', () => <Button type="submit" size="large" onClick={action('clicked')}>Large Button</Button>)

storiesOf('Buttons / Approval Button', module)
  .add('Default', () => <ApprovalButton onClick={action('clicked')}>Default Button</ApprovalButton>)
  .add('Submit', () => <ApprovalButton type="submit" onClick={action('clicked')}>Submit Button</ApprovalButton>)
  .add('With an icon', () => <ApprovalButton onClick={action('clicked')}>➕</ApprovalButton>)
  .add('With an icon and text', () => <ApprovalButton onClick={action('clicked')}>✏️ Edit this thing</ApprovalButton>)
  .add('Disabled', () => <ApprovalButton disabled onClick={action('clicked')}>Disabled Button</ApprovalButton>)
  .add('Small', () => <ApprovalButton size="small" onClick={action('clicked')}>Small Button</ApprovalButton>)
  .add('Large', () => <ApprovalButton size="large" onClick={action('clicked')}>Large Button</ApprovalButton>)

storiesOf('Buttons / Danger Button', module)
  .add('Default', () => <DangerButton onClick={action('clicked')}>Default Button</DangerButton>)
  .add('Submit', () => <DangerButton type="submit" onClick={action('clicked')}>Submit Button</DangerButton>)
  .add('With an icon', () => <DangerButton onClick={action('clicked')}>➕</DangerButton>)
  .add('With an icon and text', () => <DangerButton onClick={action('clicked')}>✏️ Edit this thing</DangerButton>)
  .add('Disabled', () => <DangerButton disabled onClick={action('clicked')}>Disabled Button</DangerButton>)
  .add('Small', () => <DangerButton size="small" onClick={action('clicked')}>Small Button</DangerButton>)
  .add('Large', () => <DangerButton size="large" onClick={action('clicked')}>Large Button</DangerButton>)

storiesOf('Buttons / Link Button', module)
  .add('Default', () => <LinkButton onClick={action('clicked')}>Default Button</LinkButton>)
  .add('Submit', () => <LinkButton type="submit" onClick={action('clicked')}>Submit Button</LinkButton>)
  .add('With an icon', () => <LinkButton onClick={action('clicked')}>➕</LinkButton>)
  .add('With an icon and text', () => <LinkButton onClick={action('clicked')}>✏️ Edit this thing</LinkButton>)
  .add('Disabled', () => <LinkButton disabled onClick={action('clicked')}>Disabled Button</LinkButton>)
  .add('Small', () => <LinkButton size="small" onClick={action('clicked')}>Small Button</LinkButton>)
  .add('Large', () => <LinkButton size="large" onClick={action('clicked')}>Large Button</LinkButton>)
