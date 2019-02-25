import React from "react";
import { Helmet } from "react-helmet";
import {
  Button, DangerButton, PrimaryButton, QuietButton, IconicButton, Box, Flex, SectionTitle, Title,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Buttons</title>
    </Helmet>
    <Box
      bg="whiteGrey" p="x4" borderRadius={ 1 }
      mb="x6"
    >
      <Title m="none">Buttons</Title>
      <Intro>Buttons make common actions immediately detectable and easy to perform.</Intro>
    </Box>

    <DocSection>
      <Flex mb="x3">
        <Flex width={ 2 / 6 } justifyContent="center" alignItems="center">
          <Button>Create project</Button>
        </Flex>
        <Box width={ 4 / 6 }>
          <Text mb="none"><Text inline fontWeight="medium">Buttons</Text> are used for actions that do not require any special emphasis and cover most cases.</Text>
        </Box>
      </Flex>
      <Flex mb="x3">
        <Flex width={ 2 / 6 } justifyContent="center" alignItems="center">
          <PrimaryButton>Edit project</PrimaryButton>
        </Flex>
        <Box width={ 4 / 6 }>
          <Text mb="none"><Text inline fontWeight="medium">Primary Buttons</Text> are used for the main action in a particular context. There is usually not more than one primary button per screen and not all of the screens require a Primary button.</Text>
        </Box>
      </Flex>
      <Flex mb="x3">
        <Flex width={ 2 / 6 } justifyContent="center" alignItems="center">
          <DangerButton>Delete project</DangerButton>
        </Flex>
        <Box width={ 4 / 6 }>
          <Text mb="none"><Text inline fontWeight="medium">Danger Buttons</Text> are used for destructive actions such as deleting. They are most likely to appear in confirmation dialogs.</Text>
        </Box>
      </Flex>
      <Flex mb="x3">
        <Flex width={ 2 / 6 } justifyContent="center" alignItems="center">
          <QuietButton>Learn more</QuietButton>
        </Flex>
        <Box width={ 4 / 6 }>
          <Text mb="none"><Text inline fontWeight="medium">Quiet Buttons</Text> are used for less important actions such as “Cancel” or actions that are not directly related to the context of the page (e.g Learn more …). Quiet buttons are often paired with a Primary button.</Text>
        </Box>
      </Flex>
      <Flex mb="x3">
        <Flex
          width={ 2 / 6 } justifyContent="center" alignItems="center"
          flexDirection="column"
        >
          <IconicButton mb="x4" icon="add" labelVisibility="hover">Add project</IconicButton>
        </Flex>
        <Box width={ 4 / 6 }>
          <Text mb="none"><Text inline fontWeight="medium">Iconic Buttons</Text> are used for universally understood actions that can effectively be represented using icon.</Text>
        </Box>
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>Sizes</SectionTitle>
      <Text mb="4">Button, Primary Button, Danger Button and Quiet Button are available in three sizes and a full-width option.</Text>
      <Button size="small" mb="x1">Read more</Button>
      <Text fontSize="small">Small</Text>
      <Button size="medium" mb="x1">Add project</Button>
      <Text fontSize="small">Medium</Text>
      <Button size="large" mb="x1">Create project</Button>
      <Text fontSize="small">Large</Text>
      <Button fullWidth mb="x1">I agree</Button>
      <Text fontSize="small">Full-width</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Text>Iconic Buttons come in two variations.</Text>
      <Flex justifyContent="space-around" alignItems="center">
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <IconicButton icon="delete" labelVisibility="hover">Delete</IconicButton>
          <Text fontSize="small" mt="x1">Label exposed on hover</Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <IconicButton icon="delete" labelVisibility="always">Delete</IconicButton>
          <Text fontSize="small" mt="x1">Permanently exposed label</Text>
        </Flex>
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>States</SectionTitle>
      <Text>All buttons can be disabled. When a button is disabled, it's greyed out and unable to be clicked.</Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Button disabled>Create project</Button>
        <PrimaryButton disabled>Create project</PrimaryButton>
        <DangerButton disabled>Delete project</DangerButton>
        <QuietButton disabled>Edit project</QuietButton>
        <IconicButton icon="delete" labelVisibility="hover" disabled>Delete</IconicButton>
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>Content guidelines</SectionTitle>
      <CheckList>Always lead with an actionable verb</CheckList>
      <CheckList>Whenever possible follow with a clear noun <em>(e.g: Create shipment, Approve delivery.)</em></CheckList>
      <CheckList>Always use sentence case</CheckList>
    </DocSection>
  </Layout>
);
