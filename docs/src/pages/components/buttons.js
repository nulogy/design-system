import React from "react";
import { Helmet } from "react-helmet";
import {
  Button, DangerButton, PrimaryButton, QuietButton, Box, Flex, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";


export default () => (
  <Layout>
    <Helmet>
      <title>Buttons</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title mb="none">Buttons</Title>
      <Intro>Buttons make common actions immediately detectable and easy to perform.</Intro>
    </Box>
    <DocSection>
      <Button>Create project</Button>
      <Highlight className="jsx">
        {`import { Button } from @nulogy-components;

<Button>Create project</Button>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Types of buttons</SectionTitle>
      <Text>There are multiple types of buttons that all accept the same options.</Text>

      <Box mb="x6">
        <SubsectionTitle>PrimaryButton</SubsectionTitle>
        <Text>Primary Buttons are used for the main action in a particular context. There is usually not more than one primary button per screen and not all of the screens require a Primary button.</Text>
        <PrimaryButton>Create project</PrimaryButton>
        <Highlight className="js">
          {`import { PrimaryButton } from @nulogy-components;

<PrimaryButton>Create project</PrimaryButton>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>DangerButton</SubsectionTitle>
        <Text>Danger Buttons are used for destructive actions such as deleting. They are most likely to appear in confirmation dialogs.</Text>
        <DangerButton>Create project</DangerButton>
        <Highlight className="js">
          {`import { DangerButton } from @nulogy-components;

<DangerButton>Create project</DangerButton>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>QuietButton</SubsectionTitle>
        <Text>Quiet Buttons are used for less important actions such as “Cancel” or actions that are not directly related to the context of the page (e.g Learn more …). Quiet buttons are often paired with a Primary button.</Text>
        <QuietButton>Learn more</QuietButton>
        <Highlight className="js">
          {`import { QuietButton } from @nulogy-components;

<QuietButton>Create project</QuietButton>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Text>The following variations are available to all button components.</Text>

      <Box mb="x6">
        <SubsectionTitle>Small</SubsectionTitle>
        <Button size="small">Read more</Button>
        <Highlight className="js">
          {"<Button size=\"small\">Read more</Button>"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Medium</SubsectionTitle>
        <Button size="medium">Read more</Button>
        <Highlight className="js">
          {"<Button size=\"medium\">Read more</Button>"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Large</SubsectionTitle>
        <Button size="large">Read more</Button>
        <Highlight className="js">
          {"<Button size=\"large\">Read more</Button>"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Full Width</SubsectionTitle>
        <Button fullWidth>Read more</Button>
        <Highlight className="js">
          {"<Button fullWidth>Full Width</Button>"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Flex justifyContent="space-between" alignItems="center">
          <Button disabled>Create project</Button>
          <PrimaryButton disabled>Create project</PrimaryButton>
          <DangerButton disabled>Delete project</DangerButton>
          <QuietButton disabled>Edit project</QuietButton>
        </Flex>
        <Highlight className="js">
          {"<Button disabled>Create project</Button>"}
        </Highlight>
      </Box>

    </DocSection>

    <DocSection>
      <SectionTitle>Content guidelines</SectionTitle>
      <CheckList>Always lead with an actionable verb</CheckList>
      <CheckList>Whenever possible follow with a clear noun <em>(e.g: Create shipment, Approve delivery.)</em></CheckList>
      <CheckList>Always use sentence case</CheckList>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>size</td>
            <td>String</td>
            <td>medium</td>
            <td>Accepts small, medium, large or fullWidth</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Marks the button as disabled and unable to be activated</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Buttons">View in Storybook</Link></ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/iconic-button">Iconic button</Link></ListItem>
    </DocSection>

  </Layout>
);
