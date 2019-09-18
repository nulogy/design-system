import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Flex,
  Text,
  Title,
  SectionTitle,
  SubsectionTitle
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
      <SectionTitle mt="x4">Typeface</SectionTitle>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Box
          width={{ extraSmall: 1, medium: 1 / 2 }}
          mb={{ extraSmall: "x3", small: 0 }}
        >
          <SubsectionTitle>IBM Plex Sans</SubsectionTitle>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
        <Box width={{ extraSmall: 1, medium: 1 / 2 }}>
          <SubsectionTitle fontFamily="mono">IBM Plex Mono</SubsectionTitle>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
      </Flex>
    </Intro>

    <DocSection>
      <SectionTitle>Headings</SectionTitle>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Title (46px/48px)
        </Text>
        <Title>The quick brown fox jumps over the lazy dog</Title>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          SectionTitle (26px/32px)
        </Text>
        <SectionTitle>The quick brown fox jumps over the lazy dog</SectionTitle>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          SubsectionTitle (18px/24px)
        </Text>
        <SubsectionTitle>
          The quick brown fox jumps over the lazy dog
        </SubsectionTitle>
      </Box>
    </DocSection>

    <DocSection mb="x8">
      <SectionTitle>Interface text</SectionTitle>
      <Text>
        Standard text should set at 16px for most cases, but 14px or 12px is
        also available.
      </Text>
    </DocSection>
  </Layout>
);
