import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  Flex,
  Text,
  Title,
  Link,
  List,
  ListItem,
  Heading1,
  Heading2,
  Heading3,
  Heading4
} from "@nulogy/components";
import { Layout, Intro, IntroText, DocSection } from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Typography</title>
    </Helmet>
    <Intro>
      <Title>Typography</Title>
      <IntroText>
        Nulogy applications are data heavy and used in various environments.
        Sticking to a typographic scale makes our applications more predictable
        and scannable for our users. Below are all the sizes and line heights
        available to use for Nulogy applications.
      </IntroText>
      <Heading2 mt="x4">Typeface</Heading2>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Box
          width={{ extraSmall: 1, medium: 1 / 2 }}
          mb={{ extraSmall: "x3", small: 0 }}
        >
          <Heading3>IBM Plex Sans</Heading3>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
        <Box width={{ extraSmall: 1, medium: 1 / 2 }}>
          <Heading3 fontFamily="mono">IBM Plex Mono</Heading3>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
      </Flex>
    </Intro>

    <DocSection>
      <Heading2>Headings</Heading2>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Heading 1 (38px/40px)
        </Text>
        <Heading1>The quick brown fox jumps over the lazy dog</Heading1>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Heading 2 (30px/40px)
        </Text>
        <Heading2>The quick brown fox jumps over the lazy dog</Heading2>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Heading 3 (24px/32px)
        </Text>
        <Heading3>The quick brown fox jumps over the lazy dog</Heading3>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Heading 4 (18px/24px)
        </Text>
        <Heading4>The quick brown fox jumps over the lazy dog</Heading4>
      </Box>
    </DocSection>

    <DocSection mb="x8">
      <Heading2>Interface text</Heading2>
      <Text>
        Standard text should set at 16px for most cases, but 14px or 12px is
        also available.
      </Text>
    </DocSection>
    <DocSection mb="x8">
      <Heading2>Usage</Heading2>
      <Text>
        Plex can be loaded in your application through whichever method you
        prefer to load fonts. An example of loading through Google fonts is
        shown below.
      </Text>
      <Highlight className="js">
        {`<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
`}
      </Highlight>
      <Text mt="x2">
        Note that if your application supports Simplified Chinese, you'll also
        need to load the{" "}
        <Link href="https://www.google.com/get/noto/">Noto Sans SC</Link> font.
        For more information, see the{" "}
        <Link href="https://github.com/nulogy/design-system/blob/master/components/README.md#2-add-fonts">
          README
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <Heading2>Related links</Heading2>
      <List>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/text">Text component</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/headings">Headings component</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
