import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, Flex, Text, Title, SectionTitle,
} from "@nulogy/components";
import * as tokens from "@nulogy/tokens";
import { Layout, Intro, DocSection } from "../../components";

const Palette = props => (
  <Box width={ 1 / 3 } mb={ 4 }>
    <Box
      mr={ 3 } pt={ 7 } pb={ 7 }
      mb={ 2 } bg={ props.colour } borderRadius={ 1 }
    />
    <Text mb={ 1 }>{props.name}</Text>
    <Text fontSize={ 0 }>{props.colour}</Text>
  </Box>
);

export default () => (
  <Layout>
    <Helmet>
      <title>Colour</title>
    </Helmet>
    <DocSection bg="whiteGrey" p={ 5 } borderRadius={ 1 }>
      <Title mb={ 0 }>Colour</Title>
      <Intro>Colours are used to set a visual tone, communicate meaning, and create a cohesive experience between Nulogy products and the physical environment. We are committed to complying with <a href="https://webaim.org/resources/contrastchecker/">WCAG AA</a> contrast ratios.</Intro>
    </DocSection>

    <DocSection mb={ 4 }>
      <SectionTitle>Text & Interactive Colours</SectionTitle>
      <Flex>
        <Palette name="Black" colour={ tokens.color_base_black } />
        <Palette name="Black Blue" colour={ tokens.color_base_black_blue } />
        <Palette name="Dark Blue" colour={ tokens.color_base_dark_blue } />
        <Palette name="Blue" colour={ tokens.color_base_blue } />
        <Palette name="Light Blue" colour={ tokens.color_base_light_blue } />
      </Flex>
    </DocSection>

    <DocSection mb={ 4 }>
      <SectionTitle>UI & Background Colours</SectionTitle>
      <Flex>
        <Palette name="Dark Grey" colour={ tokens.color_base_dark_grey } />
        <Palette name="Grey" colour={ tokens.color_base_grey } />
        <Palette name="Light Grey" colour={ tokens.color_base_light_grey } />
        <Palette name="White Grey" colour={ tokens.color_base_white_grey } />
        <Palette name="White" colour={ tokens.color_base_white } />
      </Flex>
    </DocSection>

    <DocSection mb={ 4 }>
      <SectionTitle>Contextual Colours</SectionTitle>
      <Flex>
        <Palette name="Green" colour={ tokens.color_base_green } />
        <Palette name="Red" colour={ tokens.color_base_red } />
        <Palette name="Yellow" colour={ tokens.color_base_yellow } />
      </Flex>
    </DocSection>
  </Layout>
);
