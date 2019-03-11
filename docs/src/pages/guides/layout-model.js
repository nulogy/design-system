import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, Flex, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection, DocSubsection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Layout</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Layout Model</Title>
      <Intro>This article provides a breakdown of basic concepts and directions on how to compose the layout of any complexity.</Intro>
    </Box>
    <Flex mb="x8" flexDirection={ { small: "column", medium: "row", large: "row" } }>
      <Flex bg="whiteGrey" justifyContent="center" alignItems="center" p="x3" width={ { small: 1, medium: 2 / 3, large: 1 / 2 } } height={ { small: "200px", medium: "auto", large: "auto" } }>
        <Box bg="darkBlue" height="80px" width="80px" mr="x3" />
        <Box bg="darkBlue" height="80px" width="80px" mr="x3" />
        <Box bg="darkBlue" height="80px" width="80px" />
      </Flex>
      <Flex bg="lightGrey" flexDirection="column" justifyContent="center" alignItems="center" p="x3" width={ { small: 1, medium: 1 / 3, large: 1 / 2 } } height={ { small: "200px", medium: "auto", large: "auto" } }>
        <Box height="80px" width="80px" mb="x3" bg="blackBlue" />
        <Box height="80px" width="80px" mb="x3" bg="darkBlue" />
        <Box height="80px" width="80px" bg="blue" />
      </Flex>
    </Flex>

    <DocSection>
      <SectionTitle>Building blocks</SectionTitle>
      <Text><Link href="box">Box</Link> and <Link href="flex">Flexbox</Link> components are basic building blocks of any layout composition. To be effective at using Flex component you should familiarize yourself with <Link href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Flexbox layout</Link>. If you want to have fun while doing that make sure you visit <Link href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Flexbox Froggy</Link>.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Spacing</SectionTitle>
      <DocSubsection>
        <SubsectionTitle>Padding</SubsectionTitle>
        <Text>Padding is used for adding spacing inside of the component.</Text>
        <Flex>
          <Box bg="blackBlue" color="white"><Flex bg="black" m="x2" p="x2">Box</Flex></Box>
        </Flex>
        <Highlight>
          {"<Box p=\"x3\">Box</Box>"}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Margin</SubsectionTitle>
        <Text>Margin is used for adding space around the component.</Text>
        <Flex>
          <Box bg="whiteGrey" color="white"><Flex><Box bg="blackBlue" m="x2"><Flex bg="black" m="x2" p="x2">Box</Flex></Box></Flex></Box>
        </Flex>
        <Highlight>
          {"<Box m=\"x3\">Box</Box>"}
        </Highlight>
        <Text><Link href="box">Box</Link> and <Link href="flex">Flexbox</Link> components have several style props for handling margins and paddings while adhering to the Design System's <Link href="/style/spacing">spacing scale</Link>.</Text>
      </DocSubsection>
    </DocSection>

    <DocSection>
      <SectionTitle>Layout Composition</SectionTitle>
      <Text>Flexbox is used for composing layouts. Establishing direction, alignment, wrapping, and order is achieved through the use of Flexbox props.</Text>
      <DocSubsection>
        <SubsectionTitle>Direction (flexDirection prop)</SubsectionTitle>
        <Text>Horizontal layout</Text>
        <Flex flexDirection="row" color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
        </Flex>
        <Highlight>
          {`<Flex flexDirection="row" color="white">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
  </Flex>`}
        </Highlight>
        <Text>Vertical layout</Text>
        <Flex>
          <Flex flexDirection="column" color="white">
            <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
            <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
            <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
          </Flex>
        </Flex>
        <Highlight>
          {`<Flex flexDirection="column" color="white">
      <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
      <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
      <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
    </Flex>
  </Flex>`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Wrapping content (flexWrap prop)</SubsectionTitle>
        <Text>By default, Flexbox will try to fit all of its children within the line. In order to force wrapping, you will need to modify flexWrap prop.</Text>
        <Flex flexWrap="wrap" color="white">
          <Box bg="blue" m="x1" p="x3" width={ 1 / 3 }>1</Box>
          <Box bg="darkBlue" m="x1" p="x3" width={ 1 / 4 }>2</Box>
          <Box bg="blackBlue" m="x1" p="x3" width={ 1 / 3 }>3</Box>
          <Box bg="black" m="x1" p="x3" width={ 1 / 4 }>4</Box>
        </Flex>
        <Highlight>
          {`<Flex flexWrap="wrap" color="white">
    <Box bg="blue" m="x1" p="x3" width={ 1 / 3 }>1</Box>
    <Box bg="darkBlue" m="x1" p="x3" width={ 1 / 4 }>2</Box>
    <Box bg="blackBlue" m="x1" p="x3" width={ 1 / 3 }>3</Box>
    <Box bg="black" m="x1" p="x3" width={ 1 / 4 }>4</Box>
  </Flex>`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Alignment (justifyContent, alignItems prop)</SubsectionTitle>
        <Text>Content distribution along the main axis is controlled through justifyContent prop.</Text>
        <Flex justifyContent="flex-start" color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
        </Flex>
        <Highlight>
          {`<Flex justifyContent="flex-start" color="white">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
  </Flex>`}
        </Highlight>
        <Flex justifyContent="center" color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
        </Flex>
        <Highlight>
          {`<Flex justifyContent="center" color="white">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
  </Flex>`}
        </Highlight>
        <Flex justifyContent="space-between" color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
        </Flex>
        <Highlight>
          {`<Flex justifyContent="space-between" color="white">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
  </Flex>`}
        </Highlight>
        <Text>Alignment of items on a cross-axis is controlled through alignItems prop.</Text>
        <Flex alignItems="center" color="white" bg="lightGrey" p="x1" height="240px">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
        </Flex>
        <Highlight>
          {`<Flex alignItems="center" color="white" bg="lightGrey" p="x1" height="200px">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
  </Flex>`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Order (order prop)</SubsectionTitle>
        <Text>The order prop controls the order in which elements are displayed inside of the Flexbox component.</Text>
        <Flex color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4" order="99">2</Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4" order="-1">3</Box>
          <Box bg="black" m="x1" py="x3" px="x4" order="1">4</Box>
        </Flex>
        <Highlight>
          {`<Flex color="white">
    <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
    <Box bg="darkBlue" m="x1" py="x3" px="x4" order="99">2</Box>
    <Box bg="blackBlue" m="x1" py="x3" px="x4" order="-1" >3</Box>
    <Box bg="black" m="x1" py="x3" px="x4" order="1">4</Box>
  </Flex>`}
        </Highlight>
      </DocSubsection>
      <Text>A full breakdown of capabilities and list of available props and their values is available on <Link href="flex">Flexbox</Link> component page.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Width</SectionTitle>
      <Text>The width of the Box and Flex component is set through width prop. Width prop accepts any number from 0–1 and it is being converted to a percentage. Numbers greater than 1 are interpreted as pixel values. Relative units (em/rem/vw/vh/%) are passed through string values.</Text>
      <Flex color="white">
        <Box width={ 1 / 4 } bg="blue" m="x1" p="x3">1/4</Box>
        <Box width={ 0.25 } bg="darkBlue" m="x1" p="x3">0.25</Box>
        <Box width={ 140 } bg="blackBlue" m="x1" p="x3">140</Box>
        <Box width="8.5em" bg="black" m="x1" p="x3">8.5em</Box>
      </Flex>
      <Highlight>
        {`<Flex color="white">
  <Box width={ 1/4 } bg="blue" m="x1" p="x3">1/4</Box>
  <Box width={ 0.25 } bg="darkBlue" m="x1" p="x3">0.25</Box>
  <Box width={ 140 } bg="blackBlue" m="x1" p="x3">140</Box>
  <Box width="8.5em" bg="black" m="x1" p="x3">8.5em</Box>
</Flex>`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Responsiveness</SectionTitle>
      <Text>Providing different prop values for different breaking points that are based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.breakpoints</Link> is possible by passing an array to a prop.</Text>
      <Flex color="white">
        <Box width={ { small: 1 / 9, medium: 1 / 9, large: 7 / 9 } } bg={ { small: "blue", medium: "darkBlue", large: "blackBlue" } } m="x1" py="x3" px="x4">1</Box>
        <Box width={ { small: 1 / 9, medium: 7 / 9, large: 1 / 9 } } bg={ { small: "darkBlue", medium: "blackBlue", large: "darkBlue" } } m="x1" py="x3" px="x4">2</Box>
        <Box width={ { small: 7 / 9, medium: 1 / 9, large: 1 / 9 } } bg={ { small: "blackBlue", medium: "blue", large: "blue" } } m="x1" py="x3" px="x4">3</Box>
      </Flex>
      <Highlight>
        {`<Flex color="white">
  <Box width={ { small: 1 / 9, medium: 1 / 9, large: 7 / 9 } } bg={ { small: "blue", medium: "darkBlue", large: "blackBlue" } } m="x1" py="x3" px="x4">1</Box>
  <Box width={ { small: 1 / 9, medium: 7 / 9, large: 1 / 9 } } bg={ { small: "darkBlue", medium: "blackBlue", large: "darkBlue" } } m="x1" py="x3" px="x4">2</Box>
  <Box width={ { small: 7 / 9, medium: 1 / 9, large: 1 / 9 } } bg={ { small: "blackBlue", medium: "blue", large: "blue" } } m="x1" py="x3" px="x4">3</Box>
</Flex>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>2-Column Layout Example</SectionTitle>
      <Text>The 2-column layout is a frequently found layout in our applications.</Text>
      <Flex height="400px" flexDirection={ { small: "column", medium: "row", large: "row" } }>
        <Flex bg="whiteGrey" justifyContent="center" alignItems="center" p="x3" width={ { small: 1, medium: 2 / 3, large: 1 / 2 } } height={ { small: "200px", medium: "auto", large: "auto" } }>
          <Text mb={ 0 }>Main content</Text>
        </Flex>
        <Flex bg="lightGrey" flexDirection="column" justifyContent="center" alignItems="center" p="x3" width={ { small: 1, medium: 1 / 3, large: 1 / 2 } } height={ { small: "200px", medium: "auto", large: "auto" } }>
          <Text mb={ 0 }>Sidebar content</Text>
        </Flex>
      </Flex>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/box">Box</Link></ListItem>
      <ListItem><Link href="/components/flex">Flex</Link></ListItem>
    </DocSection>

  </Layout>
);
