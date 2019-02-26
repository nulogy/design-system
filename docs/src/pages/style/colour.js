import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import {
  Box, Flex, Text, Title, SectionTitle,
} from "@nulogy/components";
import * as tokens from "@nulogy/tokens";
import { Layout, Intro, DocSection } from "../../components";

const Palette = props => {
  const {
    colour,
    name,
  } = props;
  return (
    <Box width={ 1 / 3 } mb="x3">
      <Box
        mr="x2" pt="x8" pb="x8"
        mb="x1" bg={ colour } borderRadius={ 1 }
      />
      <Text mb="half">{name}</Text>
      <Text fontSize="small">{colour}</Text>
    </Box>
  );
};

Palette.propTypes = {
  colour: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default () => (
  <Layout>
    <Helmet>
      <title>Colour</title>
    </Helmet>
    <DocSection bg="whiteGrey" p="x4" borderRadius={ 1 }>
      <Title mb="none">Colour</Title>
      <Intro>Colours are used to set a visual tone, communicate meaning, and create a cohesive experience between Nulogy products and the physical environment. We are committed to complying with <a href="https://webaim.org/resources/contrastchecker/">WCAG AA</a> contrast ratios.</Intro>
    </DocSection>

    <DocSection mb="x3">
      <SectionTitle>Text & Interactive Colours</SectionTitle>
      <Flex>
        <Palette name="Black" colour={ tokens.color_base_black } />
        <Palette name="Black Blue" colour={ tokens.color_base_black_blue } />
        <Palette name="Dark Blue" colour={ tokens.color_base_dark_blue } />
        <Palette name="Blue" colour={ tokens.color_base_blue } />
        <Palette name="Light Blue" colour={ tokens.color_base_light_blue } />
      </Flex>
    </DocSection>

    <DocSection mb="x3">
      <SectionTitle>UI & Background Colours</SectionTitle>
      <Flex>
        <Palette name="Dark Grey" colour={ tokens.color_base_dark_grey } />
        <Palette name="Grey" colour={ tokens.color_base_grey } />
        <Palette name="Light Grey" colour={ tokens.color_base_light_grey } />
        <Palette name="White Grey" colour={ tokens.color_base_white_grey } />
        <Palette name="White" colour={ tokens.color_base_white } />
      </Flex>
    </DocSection>

    <DocSection mb="x3">
      <SectionTitle>Contextual Colours</SectionTitle>
      <Flex>
        <Palette name="Green" colour={ tokens.color_base_green } />
        <Palette name="Red" colour={ tokens.color_base_red } />
        <Palette name="Yellow" colour={ tokens.color_base_yellow } />
      </Flex>
    </DocSection>
  </Layout>
);
