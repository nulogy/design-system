import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  ListItem
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import {
  color,
  margins,
  paddings,
  height,
  width
} from "../../shared/systemProps";

const propsRows = [
  ...color,
  {
    name: "display",
    type: "string",
    defaultValue: "block",
    description: "Sets CSS display property"
  },
  ...height,
  ...margins,
  {
    name: "order",
    type: "number",
    defaultValue: "",
    description: "Sets the order to be used with Flex component"
  },
  {
    name: "position",
    type: "string",
    defaultValue: "",
    description: "Sets the CSS position property"
  },
  ...paddings,
  ...width
];

export default () => (
  <Layout>
    <Helmet>
      <title>Box</title>
    </Helmet>
    <Intro>
      <Title>Box</Title>
      <IntroText>
        A layout component for controlling width, margin, padding and colour.
      </IntroText>
    </Intro>

    <DocSection>
      <Box bg="darkBlue" color="white" p="x3">
        Box
      </Box>
      <Highlight className="js">
        {`import { Box } from @nulogy/components;

<Box bg="darkBlue" color="white" p="x3">Box</Box>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Width</SubsectionTitle>
        <Text>Width can be set using a fraction or string.</Text>
        <Box bg="lightBlue" p="x3" width={1 / 2}>
          Half
        </Box>
        <Box bg="lightBlue" p="x3" width="200px">
          200px
        </Box>
        <Highlight className="js">
          {`<Box width={1/2}>Half</Box>
<Box width="200px">200px</Box>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Text Color</SubsectionTitle>
        <Text>
          Color can be set using a reference to the{" "}
          <Link href="https://nulogy.design/tokens">theme.colors</Link> object.
        </Text>
        <Box color="blue">blue</Box>
        <Highlight className="js">{'<Box color="blue">blue</Box>'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Background Color</SubsectionTitle>
        <Text>
          Color can be set using a reference to the{" "}
          <Link href="https://nulogy.design/tokens">theme.colors</Link> object.
        </Text>
        <Box bg="lightBlue">lightBlue</Box>
        <Highlight className="js">
          {'<Box bg="lightBlue">lightBlue</Box>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Margins</SubsectionTitle>
        <Text>
          Margins can be set using a reference to the{" "}
          <Link href="https://nulogy.design/tokens">theme.space</Link> object.
        </Text>
        <Box bg="lightBlue" m="x3">
          x3 (24px)
        </Box>
        <Highlight className="js">{'<Box m="x3">x3</Box'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Padding</SubsectionTitle>
        <Text>
          Padding can be set using a reference to the{" "}
          <Link href="https://nulogy.design/tokens">theme.space</Link> object.
        </Text>
        <Box bg="lightBlue" p="x3">
          x3 (24px)
        </Box>
        <Highlight className="js">{'<Box p="x3">x3</Box'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Responsive</SubsectionTitle>
        <Text>
          All Box props can be used responsively by using an object that defines
          small, medium and/or large, based on the{" "}
          <Link href="https://nulogy.design/tokens">theme.breakpoints</Link>{" "}
          object
        </Text>
        <Box color={{ small: "red", medium: "blue", large: "green" }}>
          Green text on large screens, blue on medium and red on small.
        </Box>
        <Highlight className="js">
          {`<Box color={{ small: "red", medium: "blue", large: "green"}}>
  Green text on large screens, blue on medium and red on small.
</Box>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href="/components/flex">Flex</Link>
      </ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://nulogy.design/tokens/">NDS theme</Link>
      </ListItem>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?selectedKind=Box">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
