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
import { Layout, Intro, IntroText, DocSection } from "../../components";
import theme from "../../../../components/src/theme";
import anatomy from "../../images/spacing-anatomy.png";

const SpacingExample = props => {
  const { size, scale } = props;
  return (
    <Box>
      <Flex height="64px" verticalAlign="bottom" alignItems="flex-end">
        <Box bg="lightBlue" mx="auto" mb="x2" height={size} width={size} />
      </Flex>
      <Text
        textAlign="center"
        fontSize={{ extraSmall: "small", medium: "medium" }}
        mb="half"
      >
        {size}
      </Text>
      <Text textAlign="center" fontSize="small">
        {scale}
      </Text>
    </Box>
  );
};

SpacingExample.propTypes = {
  size: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

const SpacingExamples = props => {
  const { values } = props;

  return Object.keys(values).map(key => {
    if (key === "none") {
      return null;
    }
    return <SpacingExample size={values[key]} scale={key} />;
  });
};

SpacingExamples.propTypes = {
  values: PropTypes.objectOf(PropTypes.object).isRequired
};

export default () => (
  <Layout>
    <Helmet>
      <title>Spacing</title>
    </Helmet>
    <Intro>
      <Title>Spacing</Title>
      <IntroText>
        A spacing scale is used to maintain consistent paddings between and
        within elements throughout our products. Sticking to a scale allows us
        to be more consistent and predictable, and makes our designs more
        harmonious.
      </IntroText>
    </Intro>

    <DocSection>
      <SectionTitle>Scale</SectionTitle>
      <Text mb="x3">
        Nulogy uses a scale based on 8px with modifiers from half (4px) to 8x
        (64px).
      </Text>

      <Flex justifyContent="space-between">
        <SpacingExamples values={theme.space} />
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>Example</SectionTitle>
      <img src={anatomy} alt="Spacing example" />
    </DocSection>

    <DocSection>
      <SectionTitle>How to choose spacing</SectionTitle>
      <Text>
        There are two important factors to consider when choosing spacing:{" "}
        <em>size</em> and <em>relatedness</em>
      </Text>
      <Box mb="x2">
        <List>
          <ListItem>
            Use less spacing inside smaller elements or between functionally
            related elements.
          </ListItem>
          <ListItem>
            Use more spacing inside larger elements or between less functionally
            related elements
          </ListItem>
        </List>
      </Box>
      <Text fontSize="small">
        <em>
          Note: half should mostly be used for spacing related items within an
          element, e.g a button’s text and it’s icon.
        </em>
      </Text>
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
