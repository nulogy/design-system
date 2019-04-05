import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, Title, SectionTitle, SubsectionTitle, Link, ListItem, theme,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, IntroText, DocSection,
} from "../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Tokens</title>
    </Helmet>
    <Intro>

      <Title>Tokens</Title>
      <IntroText>Tokens are the design options for creating interfaces in Nulogy's style. They can be accessed in Javascript via the theme.</IntroText>
    </Intro>

    <DocSection>
      <SubsectionTitle>Full theme</SubsectionTitle>
      <pre>{JSON.stringify(theme, null, "  ")}</pre>
    </DocSection>

    <DocSection>
      <SectionTitle>Usage</SectionTitle>

      <SubsectionTitle>For custom components</SubsectionTitle>
      <Text>Tokens can be by used by importing the theme file and referencing the appropriate object. Always reference a token by its key, not its value.</Text>
      <Highlight className="js">
        {"import { theme } from @nulogy/components;\n\nBlue is ${theme.colors.blue}"}
      </Highlight>

      <SubsectionTitle>Theme as props</SubsectionTitle>
      <Text>Some of our components have props that reference our theme, e.g for color or spacing values. These are connected via <Link href="https://styled-system.com/getting-started">Styled-System</Link>, which does the work of finding the appropriate object for you.</Text>
      <Box bg="darkBlue" color="white" p="x3">Box</Box>
      <Highlight className="js">
        {`import { Box } from @nulogy/components;

<Box bg="darkBlue" color="white" p="x3">Box</Box>
`}
      </Highlight>

    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://github.com/nulogy/design-system/tree/master/tokens">@nulogy/tokens</Link></ListItem>
    </DocSection>

  </Layout>
);
