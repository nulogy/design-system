import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  Flex,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  DocSubsection
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Layout</title>
    </Helmet>
    <Intro>
      <Title>Layout</Title>
      <IntroText>
        This article provides a breakdown of basic concepts and directions on
        how to compose the layout of any complexity.
      </IntroText>
    </Intro>
    <Flex
      mb="x8"
      flexDirection={{ extraSmall: "column", small: "row", medium: "row" }}
    >
      <Flex
        bg="whiteGrey"
        justifyContent="center"
        alignItems="center"
        p="x3"
        width={{ extraSmall: 1, small: 2 / 3, medium: 1 / 2 }}
        height={{ extraSmall: "200px", small: "auto", medium: "auto" }}
      >
        <Box bg="darkBlue" height="80px" width="80px" mr="x3" />
        <Box bg="darkBlue" height="80px" width="80px" mr="x3" />
        <Box bg="darkBlue" height="80px" width="80px" />
      </Flex>
      <Flex
        bg="lightGrey"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="x3"
        width={{ extraSmall: 1, small: 1 / 3, medium: 1 / 2 }}
        height={{ extraSmall: "200px", small: "auto", medium: "auto" }}
      >
        <Box height="80px" width="80px" mb="x3" bg="blackBlue" />
        <Box height="80px" width="80px" mb="x3" bg="darkBlue" />
        <Box height="80px" width="80px" bg="blue" />
      </Flex>
    </Flex>

    <DocSection>
      <SectionTitle>Building blocks</SectionTitle>
      <Text>
        <Link href="/components/box">Box</Link> and{" "}
        <Link href="/components/flex">Flex</Link> components are basic building
        blocks of any layout composition and are based on CSS box model and CSS
        flexbox layout model. Listed below are the links that will help you
        familiarize yourself with these concepts and help you be effective at
        using Box and Flex components.
      </Text>
      <List mb="x3">
        <ListItem>
          <Link href="https://www.w3schools.com/css/css_boxmodel.asp">
            CSS box model
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">
            CSS flexbox layout model
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://flexboxfroggy.com/">Flexbox Froggy</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Spacing</SectionTitle>
      <SubsectionTitle>Padding and Margins</SubsectionTitle>
      <Text>
        Padding is used for adding spacing inside of the component and margin is
        used for adding space around the component.
      </Text>
      <Flex bg="lightGrey" style={{ display: "inline-flex" }}>
        <Box>
          <Flex color="white" bg="blackBlue" p="x3" m="x3">
            Padding + Margin
          </Flex>
        </Box>
        <Box>
          <Flex color="white" bg="blackBlue" p="x6">
            Padding
          </Flex>
        </Box>
        <Box>
          <Flex color="white" bg="blackBlue" m="x6">
            Margin
          </Flex>
        </Box>
      </Flex>
      <Highlight>
        {`<Box bg="blackBlue" p="x3" m="x3">Padding + Margin</Box>
<Box bg="blackBlue" p="x6">Padding</Box>
<Box bg="blackBlue" m="x6">Margin</Box>
`}
      </Highlight>
      <Text>
        <Link href="/components/box">Box</Link> and{" "}
        <Link href="/components/flex">Flexbox</Link> components have several
        style props for handling margins and paddings while adhering to the
        Design System's <Link href="/style/spacing">spacing scale</Link>.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Layout Composition</SectionTitle>
      <Text>
        Flexbox is used for composing layouts. Establishing direction,
        alignment, wrapping, and order is achieved through the use of Flexbox
        props. Do not use floats to compose layout.
      </Text>
      <DocSubsection>
        <SubsectionTitle mt="x3">
          Direction (flexDirection prop)
        </SubsectionTitle>
        <DocSubsection>
          <Text mb="x2" color="darkGrey">
            Horizontal layout
          </Text>
          <Flex flexDirection="row" color="white">
            <Box bg="blue" m="x1" py="x3" px="x4">
              1
            </Box>
            <Box bg="darkBlue" m="x1" py="x3" px="x4">
              2
            </Box>
            <Box bg="blackBlue" m="x1" py="x3" px="x4">
              3
            </Box>
          </Flex>
          <Highlight>
            {`<Flex flexDirection="row" color="white">
  <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
  <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
  <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
</Flex>`}
          </Highlight>
        </DocSubsection>
        <DocSubsection>
          <Text mb="x2" color="darkGrey">
            Vertical layout
          </Text>
          <Flex>
            <Flex flexDirection="column" color="white">
              <Box bg="blue" m="x1" py="x3" px="x4">
                1
              </Box>
              <Box bg="darkBlue" m="x1" py="x3" px="x4">
                2
              </Box>
              <Box bg="blackBlue" m="x1" py="x3" px="x4">
                3
              </Box>
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
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Wrapping content (flexWrap prop)</SubsectionTitle>
        <Text>
          By default, Flexbox will try to fit all of its children within the
          line. In order to force wrapping, you will need to modify flexWrap
          prop.
        </Text>
        <Text mb="x2" color="darkGrey">
          Wrapped content
        </Text>
        <Flex flexWrap="wrap" color="white">
          <Box bg="blue" m="x1" p="x3" width={1 / 3}>
            1
          </Box>
          <Box bg="darkBlue" m="x1" p="x3" width={1 / 4}>
            2
          </Box>
          <Box bg="blackBlue" m="x1" p="x3" width={1 / 3}>
            3
          </Box>
          <Box bg="black" m="x1" p="x3" width={1 / 4}>
            4
          </Box>
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
        <SubsectionTitle>
          Alignment (justifyContent, alignItems prop)
        </SubsectionTitle>
        <Text>
          Content distribution along the main axis is controlled through
          justifyContent prop.
        </Text>
        <DocSubsection>
          <Text mb="x2" color="darkGrey">
            Left aligned
          </Text>
          <Flex justifyContent="flex-start" color="white">
            <Box bg="blue" m="x1" py="x3" px="x4">
              1
            </Box>
            <Box bg="darkBlue" m="x1" py="x3" px="x4">
              2
            </Box>
            <Box bg="blackBlue" m="x1" py="x3" px="x4">
              3
            </Box>
          </Flex>
          <Highlight>
            {`<Flex justifyContent="flex-start" color="white">
  <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
  <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
  <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
</Flex>`}
          </Highlight>
        </DocSubsection>
        <DocSubsection>
          <Text mb="x2" color="darkGrey">
            Centered
          </Text>
          <Flex justifyContent="center" color="white">
            <Box bg="blue" m="x1" py="x3" px="x4">
              1
            </Box>
            <Box bg="darkBlue" m="x1" py="x3" px="x4">
              2
            </Box>
            <Box bg="blackBlue" m="x1" py="x3" px="x4">
              3
            </Box>
          </Flex>
          <Highlight>
            {`<Flex justifyContent="center" color="white">
  <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
  <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
  <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
</Flex>`}
          </Highlight>
        </DocSubsection>
        <DocSubsection>
          <Text mb="x2" color="darkGrey">
            Evenly distributed
          </Text>
          <Flex justifyContent="space-between" color="white">
            <Box bg="blue" m="x1" py="x3" px="x4">
              1
            </Box>
            <Box bg="darkBlue" m="x1" py="x3" px="x4">
              2
            </Box>
            <Box bg="blackBlue" m="x1" py="x3" px="x4">
              3
            </Box>
          </Flex>
          <Highlight>
            {`<Flex justifyContent="space-between" color="white">
  <Box bg="blue" m="x1" py="x3" px="x4">1</Box>
  <Box bg="darkBlue" m="x1" py="x3" px="x4">2</Box>
  <Box bg="blackBlue" m="x1" py="x3" px="x4">3</Box>
</Flex>`}
          </Highlight>
        </DocSubsection>
        <Text>
          Alignment of items on a cross-axis is controlled through alignItems
          prop.
        </Text>
        <Text mb="x2" color="darkGrey">
          Vertical centered
        </Text>
        <Flex
          alignItems="center"
          color="white"
          bg="lightGrey"
          p="x1"
          height="240px"
        >
          <Box bg="blue" m="x1" py="x3" px="x4">
            1
          </Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4">
            2
          </Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4">
            3
          </Box>
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
        <Text>
          The order prop controls the order in which elements are displayed
          inside of the Flexbox component.
        </Text>
        <Text mb="x2" color="darkGrey">
          Changed default order
        </Text>
        <Flex color="white">
          <Box bg="blue" m="x1" py="x3" px="x4">
            1
          </Box>
          <Box bg="darkBlue" m="x1" py="x3" px="x4" order="99">
            2
          </Box>
          <Box bg="blackBlue" m="x1" py="x3" px="x4" order="-1">
            3
          </Box>
          <Box bg="black" m="x1" py="x3" px="x4" order="1">
            4
          </Box>
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
      <Text>
        A full breakdown of capabilities and list of available props and their
        values is available on the <Link href="/components/flex">Flex</Link>{" "}
        component page.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Width</SectionTitle>
      <Text>
        The width of the Box and Flex component is set through the width prop.
        Width accepts any number from 0–1 and is converted to a percentage.
        Numbers greater than 1 are interpreted as pixel values. Relative units
        (em/rem/vw/vh/%) are passed through string values.
      </Text>
      <Text mb="x2" color="darkGrey">
        Varoius ways to set a width
      </Text>
      <Flex color="white">
        <Box width={1 / 4} bg="blue" m="x1" p="x3">
          1/4
        </Box>
        <Box width={0.25} bg="darkBlue" m="x1" p="x3">
          0.25
        </Box>
        <Box width={140} bg="blackBlue" m="x1" p="x3">
          140
        </Box>
        <Box width="8.5em" bg="black" m="x1" p="x3">
          8.5em
        </Box>
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
      <Text>
        Providing different prop values for different breaking points that are
        based on the <Link href="/theme">theme.breakpoints</Link> is possible by
        passing an object to a prop.
      </Text>
      <Text mb="x2" color="darkGrey">
        Size and background colour change based on the screen size
      </Text>
      <Flex color="white">
        <Box
          width={{ extraSmall: 1 / 9, small: 1 / 9, medium: 7 / 9 }}
          bg={{ extraSmall: "blue", small: "darkBlue", medium: "blackBlue" }}
          m="x1"
          py="x3"
          px="x4"
        >
          1
        </Box>
        <Box
          width={{ extraSmall: 1 / 9, small: 7 / 9, medium: 1 / 9 }}
          bg={{
            extraSmall: "darkBlue",
            small: "blackBlue",
            medium: "darkBlue"
          }}
          m="x1"
          py="x3"
          px="x4"
        >
          2
        </Box>
        <Box
          width={{ extraSmall: 7 / 9, small: 1 / 9, medium: 1 / 9 }}
          bg={{ extraSmall: "blackBlue", small: "blue", medium: "blue" }}
          m="x1"
          py="x3"
          px="x4"
        >
          3
        </Box>
      </Flex>
      <Highlight>
        {`<Flex color="white">
  <Box width={ { extraSmall: 1 / 9, small: 1 / 9, medium: 7 / 9 } } bg={ { extraSmall: "blue", small: "darkBlue", medium: "blackBlue" } } m="x1" py="x3" px="x4">1</Box>
  <Box width={ { extraSmall: 1 / 9, small: 7 / 9, medium: 1 / 9 } } bg={ { extraSmall: "darkBlue", small: "blackBlue", medium: "darkBlue" } } m="x1" py="x3" px="x4">2</Box>
  <Box width={ { extraSmall: 7 / 9, small: 1 / 9, medium: 1 / 9 } } bg={ { extraSmall: "blackBlue", small: "blue", medium: "blue" } } m="x1" py="x3" px="x4">3</Box>
</Flex>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>2-Column Layout Example</SectionTitle>
      <Text mb="x2" color="darkGrey">
        Typical 2-column layout structure with a sidebar or a pannel.
      </Text>
      <Flex
        height="400px"
        flexDirection={{ extraSmall: "column", small: "row", medium: "row" }}
      >
        <Flex
          bg="whiteGrey"
          justifyContent="center"
          alignItems="center"
          p="x3"
          width={{ extraSmall: 1, small: 2 / 3, medium: 1 / 2 }}
          height={{ extraSmall: "200px", small: "auto", medium: "auto" }}
        >
          <Text mb={0}>Main content</Text>
        </Flex>
        <Flex
          bg="lightGrey"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="x3"
          width={{ extraSmall: 1, small: 1 / 3, medium: 1 / 2 }}
          height={{ extraSmall: "200px", small: "auto", medium: "auto" }}
        >
          <Text mb={0}>Sidebar content</Text>
        </Flex>
      </Flex>
      <Highlight>
        {`<Flex height="400px" flexDirection={ { extraSmall: "column", small: "row", medium: "row" } }>
  <Flex bg="whiteGrey" justifyContent="center" alignItems="center" p="x3" width={ { extraSmall: 1, small: 2 / 3, medium: 1 / 2 } } height={ { extraSmall: "200px", small: "auto", medium: "auto" } }>
    <Text mb={ 0 }>Main content</Text>
  </Flex>
  <Flex bg="lightGrey" flexDirection="column" justifyContent="center" alignItems="center" p="x3" width={ { extraSmall: 1, small: 1 / 3, medium: 1 / 2 } } height={ { extraSmall: "200px", small: "auto", medium: "auto" } }>
    <Text mb={ 0 }>Sidebar content</Text>
  </Flex>
</Flex>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>IE11 and Flexbox</SectionTitle>
      <Text>
        To make Flexbox work properly in IE11 additional work may be required.
        Listed below are the issues that have been discovered and their
        potential solutions. If you are lucky enough to run into an issue that
        hasn't been recorded, please let us now in{" "}
        <Link href="https://nu.slack.com/messages/CBAFQ4X7X">
          #design-system
        </Link>{" "}
        Slack channel.
      </Text>
      <SubsectionTitle>Using minHeight</SubsectionTitle>
      <Text>
        Setting minHeight on a flex container does not apply to its flex items.
        There are 2 ways to resolve this issue:
      </Text>
      <List mb="x3">
        <ListItem>
          Substituting minHeight with height{" "}
          <Link href="https://storybook.nulogy.design/?path=/story/flex--ie11-minheight-solution-1">
            (Example)
          </Link>
        </ListItem>
        <ListItem>
          Wrapping flex container with another flex container{" "}
          <Link href="https://storybook.nulogy.design/?path=/story/flex--ie11-minheight-solution-2">
            (Example)
          </Link>
        </ListItem>
      </List>
      <Text>
        Please refer{" "}
        <Link href="https://github.com/philipwalton/flexbugs#flexbug-3">
          here
        </Link>{" "}
        for a detailed description of the bug and available solutions.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/box">Box</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/flex">Flex</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
