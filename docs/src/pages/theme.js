import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Highlight from "react-highlight";
import {
  Alert,
  Box,
  Title,
  SectionTitle,
  SubsectionTitle,
  Link,
  List,
  ListItem,
  theme
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection
} from "../components";

const CustomComponent = styled.div({
  background: theme.colors.darkBlue,
  color: theme.colors.white,
  padding: theme.space.x3
});

export default () => (
  <Layout>
    <Helmet>
      <title>Theme</title>
    </Helmet>
    <Intro>
      <Title>Theme</Title>
      <IntroText>
        Design options for creating interfaces in Nulogy's style can be accessed
        in Javascript via the theme.
      </IntroText>
    </Intro>

    <DocSection>
      <SubsectionTitle>Full theme</SubsectionTitle>
      <Highlight>{JSON.stringify(theme, null, "  ")}</Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Usage</SectionTitle>

      <Box mb="x4">
        <SubsectionTitle>Theme as props</SubsectionTitle>
        <Text>
          Some of our components have props that reference our theme, e.g for
          color or spacing values. These are connected via{" "}
          <Link href="https://styled-system.com/getting-started">
            Styled-System
          </Link>
          , which does the work of finding the appropriate object for you, e.g:
        </Text>
        <Box bg="darkBlue" color="white" p="x3">
          Styled Box
        </Box>
        <Highlight className="js">
          {`import theme from "@nulogy/components";

<Box bg="darkBlue" color="white" p="x3">Styled Box</Box>
`}
        </Highlight>
      </Box>

      <SubsectionTitle>For custom components</SubsectionTitle>
      <Text>
        Tokens can be by used by importing the theme file and referencing the
        appropriate object directly. For example, if we didn't have the Box
        component above we could manually create it like so:
      </Text>
      <CustomComponent>Custom component</CustomComponent>

      <Highlight className="js">
        {`import { theme } from "@nulogy/components"

const CustomComponent = styled.div({
  background: theme.colors.darkBlue,
  color: theme.colors.white,
  padding: theme.space.x3,
});

<CustomComponent>Custom component</CustomComponent>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Custom themes</SectionTitle>
      <Text>
        As of version 3.0, themes can be overriden at the NDSProvider level.
        This allows changing all definitions of a property at once.{" "}
      </Text>
      <Text>
        For example, if you were working in PackManager and wanted the "medium"
        font size used in all components to be 14px instead of 16px:{" "}
      </Text>
      <Highlight className="js">
        {`import { NDSProvider } from "@nulogy/components"

<NDSProvider theme={fontSizes: {medium: "14px"}}>// app</NDSProvider>`}
      </Highlight>
      <Alert>
        This is a powerful feature, but should be used sparingly. Please let
        Design Ops know when you've overriden the theme for any reason, in case
        there are systemic problems we could be solving in the system directly
        instead.
      </Alert>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://github.com/nulogy/design-system/tree/master/tokens">
            @nulogy/tokens
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
