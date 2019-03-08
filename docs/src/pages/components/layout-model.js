import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, Flex, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Layout</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Layout Model</Title>
      <Intro>Layout model provides breakdown of basic concepts and directions on how to compose layout of any complexity.</Intro>
    </Box>


<Box bg="whiteGrey">
  <Flex bg="lightGrey" my="x4" mx="x4">
    <Box bg="blue" m="x4"><Text m="x3" color="white">Box</Text></Box>

  </Flex>
</Box>



    <DocSection>
      <SectionTitle>Building blocks</SectionTitle>
      <Text><Link href="box">Box</Link> and <Link href="flex">Flexbox</Link> components are basic building blocks of any layout composition. To be effective at using Flex component you should be familiarize yourself with <Link href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Flexbox layout</Link>. Flexbox game.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Spacing</SectionTitle>
      <Text>Paddings are used for adding spacing inside of the component.</Text>
      <Flex>
      <Box bg="blackBlue"><Flex bg="black" m="x3"><Text m="x3" color="white">Box</Text></Flex></Box>
      </Flex>
      <Highlight>
        {"<Box p=\"x3\">1</Box>"}
      </Highlight>
      <Text>Margins are used for adding space around the component.</Text>
      <Flex>
        <Box bg="whiteGrey"><Flex><Box bg="blackBlue" m="x3"><Flex bg="black" m="x3"><Text m="x3" color="white">Box</Text></Flex></Box></Flex></Box>
        </Flex>
      <Highlight>
        {"<Box m=\"x3\">1</Box>"}
      </Highlight>
      <Text>Box and Flex components have several style props for handling margins and paddings, while adhering to the Design System's spacing scale.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Layout Copmosition</SectionTitle>
      <Text>Flexbox is used for composing layouts. Establishing appropriate direction, alignment, wrapping and oreder is done through Flexbox props.</Text>
      <SubsectionTitle>Flex-direction</SubsectionTitle>
      <Text>Examples</Text>
      <SubsectionTitle>Alignment</SubsectionTitle>
      <Text>justify-content</Text>
      <Text>Examples</Text>
      <Text>align-items</Text>
      <Text>Examples</Text>
      <SubsectionTitle>Wrapping</SubsectionTitle>
      <Text>Examples</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsiveness</SectionTitle>
      <Text>Real life example</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>2-Column Layout Example</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/box">Box</Link></ListItem>
      <ListItem><Link href="/components/flex">Flex</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Box">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
