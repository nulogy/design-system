import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import {
  Box,
  Flex,
  Text,
  Title,
  SectionTitle,
  List,
  ListItem,
  Link
} from "@nulogy/components";
import * as tokens from "@nulogy/tokens";
import { Layout, DocSection, Intro, IntroText } from "../../components";

const Palette = props => {
  const { colour, name } = props;
  return (
    <Box width={{ extraSmall: 1, small: 1 / 3 }} mb="x3">
      <Box
        mr="x2"
        pt={{ extraSmall: "x4", small: "x8" }}
        pb={{ extraSmall: "x4", small: "x8" }}
        mb="x1"
        bg={colour}
        borderRadius={1}
      />
      <Text mb="half">{name}</Text>
      <Text fontSize="small">{colour}</Text>
    </Box>
  );
};

Palette.propTypes = {
  colour: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default () => (
  <Layout>
    <Helmet>
      <title>Colour</title>
    </Helmet>
    <Intro>
      <Title>Colour</Title>
      <IntroText>
        Colours are used to set a visual tone, communicate meaning, and create a
        cohesive experience between Nulogy products and the physical
        environment. We are committed to complying with{" "}
        <a href="https://webaim.org/resources/contrastchecker/">WCAG AA</a>{" "}
        contrast ratios.
      </IntroText>
    </Intro>

    <DocSection mb="x3">
      <SectionTitle>Text & Interactive Colours</SectionTitle>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Palette name="Black" colour={tokens.color_base_black} />
        <Palette name="Black Blue" colour={tokens.color_base_black_blue} />
        <Palette name="Dark Blue" colour={tokens.color_base_dark_blue} />
        <Palette name="Blue" colour={tokens.color_base_blue} />
        <Palette name="Light Blue" colour={tokens.color_base_light_blue} />
      </Flex>
    </DocSection>

    <DocSection mb="x3">
      <SectionTitle>UI & Background Colours</SectionTitle>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Palette name="Dark Grey" colour={tokens.color_base_dark_grey} />
        <Palette name="Grey" colour={tokens.color_base_grey} />
        <Palette name="Light Grey" colour={tokens.color_base_light_grey} />
        <Palette name="White Grey" colour={tokens.color_base_white_grey} />
        <Palette name="White" colour={tokens.color_base_white} />
      </Flex>
    </DocSection>

    <DocSection mb="x3">
      <SectionTitle>Contextual Colours</SectionTitle>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Palette name="Green" colour={tokens.color_base_green} />
        <Palette name="Light Green" colour={tokens.color_base_light_green} />
        <Palette name="Red" colour={tokens.color_base_red} />
        <Palette name="Light Red" colour={tokens.color_base_light_red} />
        <Palette name="Yellow" colour={tokens.color_base_yellow} />
        <Palette name="Light Yellow" colour={tokens.color_base_light_yellow} />
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>Related links</SectionTitle>
      <List>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
