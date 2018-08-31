import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Button from "./Button";
import ApprovalButton from "./ApprovalButton";
import DangerButton from "./DangerButton";
import QuietButton from "./QuietButton";
import styled, { css } from 'styled-components';
import { font } from '@nulogy/tokens';

const Text = styled.p`
  font-size: ${font.size.medium}px;
  font-family: ${font.family.regular};
  line-height: 1.5;
`;

const InlineText = styled.p`
  font-size: ${font.size.medium}px;
  font-family: ${font.family.regular};
  line-height: 1.5;
  display: inline;
`;

const Section = styled.section`
  font-size: ${font.size.medium}px;
  font-family: ${font.family.regular};
  line-height: 1.5;
`;

const Title = ({ children }) => <h1>{ children }</h1>
const Nbsp = () => <React.Fragment>{" "}</React.Fragment>;

storiesOf('Buttons / Examples', module)
  .add('All Buttons', () => (
    <React.Fragment>
      <Title>Buttons</Title>
      <Button onClick={action('clicked')}>Button</Button>
      <Nbsp />
      <ApprovalButton onClick={action('clicked')}>Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton onClick={action('clicked')}>Danger Button</DangerButton>

      <Nbsp />
      <Button disabled onClick={action('clicked')}>Button</Button>
      <Nbsp />
      <ApprovalButton disabled onClick={action('clicked')}>Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton disabled onClick={action('clicked')}>Danger Button</DangerButton>

      <Title>Primary Buttons</Title>
      <Button type="submit" onClick={action('clicked')}>Primary Button</Button>
      <Nbsp />
      <ApprovalButton type="submit" onClick={action('clicked')}>Primary Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton type="submit" onClick={action('clicked')}>Primary Danger Button</DangerButton>
      <Nbsp />
      <Button type="submit" disabled onClick={action('clicked')}>Primary Button</Button>
      <Nbsp />
      <ApprovalButton type="submit" disabled onClick={action('clicked')}>Primary Approval Button</ApprovalButton>
      <Nbsp />
      <DangerButton type="submit" disabled onClick={action('clicked')}>Primary Danger Button</DangerButton>

      <Title>Quiet Button</Title>
      <QuietButton onClick={action('clicked')}>Quiet Button</QuietButton>
      <Nbsp />
      <QuietButton disabled onClick={action('clicked')}>Disabled Quiet Button</QuietButton>
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

  storiesOf('Buttons / Primary Approval Button', module)
  .add('Default', () => <ApprovalButton type="submit" onClick={action('clicked')}>Default Button</ApprovalButton>)
  .add('With an icon', () => <ApprovalButton type="submit" onClick={action('clicked')}>➕</ApprovalButton>)
  .add('With an icon and text', () => <ApprovalButton type="submit" onClick={action('clicked')}>✏️ Edit this thing</ApprovalButton>)
  .add('Disabled', () => <ApprovalButton type="submit" disabled onClick={action('clicked')}>Disabled Button</ApprovalButton>)
  .add('Small', () => <ApprovalButton type="submit" size="small" onClick={action('clicked')}>Small Button</ApprovalButton>)
  .add('Large', () => <ApprovalButton type="submit" size="large" onClick={action('clicked')}>Large Button</ApprovalButton>)

storiesOf('Buttons / Danger Button', module)
  .add('Default', () => <DangerButton onClick={action('clicked')}>Default Button</DangerButton>)
  .add('Submit', () => <DangerButton type="submit" onClick={action('clicked')}>Submit Button</DangerButton>)
  .add('With an icon', () => <DangerButton onClick={action('clicked')}>➕</DangerButton>)
  .add('With an icon and text', () => <DangerButton onClick={action('clicked')}>✏️ Edit this thing</DangerButton>)
  .add('Disabled', () => <DangerButton disabled onClick={action('clicked')}>Disabled Button</DangerButton>)
  .add('Small', () => <DangerButton size="small" onClick={action('clicked')}>Small Button</DangerButton>)
  .add('Large', () => <DangerButton size="large" onClick={action('clicked')}>Large Button</DangerButton>)

storiesOf('Buttons / Primary Danger Button', module)
  .add('Default', () => <DangerButton type="submit" onClick={action('clicked')}>Default Button</DangerButton>)
  .add('With an icon', () => <DangerButton type="submit" onClick={action('clicked')}>➕</DangerButton>)
  .add('With an icon and text', () => <DangerButton type="submit" onClick={action('clicked')}>✏️ Edit this thing</DangerButton>)
  .add('Disabled', () => <DangerButton type="submit" disabled onClick={action('clicked')}>Disabled Button</DangerButton>)
  .add('Small', () => <DangerButton type="submit" size="small" onClick={action('clicked')}>Small Button</DangerButton>)
  .add('Large', () => <DangerButton type="submit" size="large" onClick={action('clicked')}>Large Button</DangerButton>)

storiesOf('Buttons / Quiet Button', module)
  .add('Default', () => <QuietButton onClick={action('clicked')}>Default Button</QuietButton>)
  .add('Submit', () => <QuietButton type="submit" onClick={action('clicked')}>Submit Button</QuietButton>)
  .add('With an icon', () => <QuietButton onClick={action('clicked')}>➕</QuietButton>)
  .add('With an icon and text', () => <QuietButton onClick={action('clicked')}>✏️ Edit this thing</QuietButton>)
  .add('Disabled', () => <QuietButton disabled onClick={action('clicked')}>Disabled Button</QuietButton>)
  .add('Small', () => <QuietButton size="small" onClick={action('clicked')}>Small Button</QuietButton>)
  .add('Large', () => <QuietButton size="large" onClick={action('clicked')}>Large Button</QuietButton>)

storiesOf('Buttons / Size', module)
  .add('Small', () => <Button size="small" type="submit" onClick={action('clicked')}>Submit</Button>)
  .add('Medium', () => <Button type="submit" onClick={action('clicked')}>Submit</Button>)
  .add('Large', () => <Button type="submit" size="large" onClick={action('clicked')}>Create Project</Button>)
  .add('Small within the line of text', () => <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam erat, in placerat nisi semper vitae. Donec ipsum urna, eleifend nec sem in, tincidunt bibendum lorem. Sed dolor ante, sollicitudin a libero sit amet, finibus <Button size="small" type="submit" onClick={action('clicked')}>More details</Button> iaculis ligula. Suspendisse lacus nisl, convallis quis tincidunt nec, fermentum a odio. Nulla ex lacus, pulvinar eu vestibulum eget, suscipit vitae justo. Aliquam orci nisi, pharetra nec arcu et, gravida scelerisque quam. Suspendisse potenti. Pellentesque condimentum eget elit nec varius. Donec dictum magna ac ante dictum molestie. Maecenas a sapien ac massa lacinia maximus et pharetra lacus. Nunc at neque sit amet justo lobortis sollicitudin.</Text>)
  .add('Small after the line of text', () => <Section><InlineText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam erat, in placerat nisi semper vitae. Donec ipsum urna, eleifend nec sem in, tincidunt bibendum lorem. Sed dolor ante, sollicitudin a libero sit amet, finibus iaculis ligula. Suspendisse lacus nisl, convallis quis tincidunt nec, fermentum a odio. Nulla ex lacus, pulvinar eu vestibulum eget, suscipit vitae justo. Aliquam orci nisi, pharetra nec arcu et, gravida scelerisque quam. Suspendisse potenti. Pellentesque condimentum eget elit nec varius. Donec dictum magna ac ante dictum molestie. Maecenas a sapien ac massa lacinia maximus et pharetra lacus. Nunc at neque sit amet justo lobortis sollicitudin.</InlineText> <Button size="small" type="submit" onClick={action('clicked')}>More details</Button></Section>)


storiesOf('Buttons / Long Labels', module)
  .add('Small', () => <Button size="small" type="submit" onClick={action('clicked')}>Super Long Labels Pellentesque condimentum eget elit nec varius</Button>)
  .add('Medium', () => <Button type="submit" onClick={action('clicked')}>Super Long Labels Pellentesque condimentum eget elit nec varius</Button>)
  .add('Large', () => <Button size="large" type="submit" onClick={action('clicked')}>Super Long Labels Pellentesque condimentum eget elit nec varius</Button>)
