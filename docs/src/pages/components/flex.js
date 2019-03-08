import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, Flex, SectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Flex</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Flex</Title>
      <Intro>A wrapper component that extends <Link href="/components/Box">Box</Link> to create layouts using Flexbox.</Intro>
    </Box>

    <DocSection>
      <Flex bg="lightBlue">
        <Box width={ 1 / 2 } p="x3" m="x3" bg="blackBlue" />
        <Box width={ 1 / 2 } p="x3" m="x3" bg="darkBlue" />
      </Flex>

      <Highlight className="js">
        {`import {Box, Flex} from @nulogy/components;

<Flex bg="lightBlue">
  <Box width={1/2} p="x3" m="x3" bg="blackBlue"></Box>
  <Box width={1/2} p="x3" m="x3" bg="darkBlue"></Box>
</Flex>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive</SectionTitle>
      <Text>Like Box, all props can be used responsively by using an object that defines small, medium and/or large, based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.breakpoints</Link> object</Text>
      <Text>This example displays columns on small screens and rows on large ones.</Text>
      <Flex bg="lightBlue" flexDirection={ { small: "column", large: "row" } }>
        <Box width={ 1 / 2 } p="x3" m="x3" bg="blackBlue" />
        <Box width={ 1 / 2 } p="x3" m="x3" bg="darkBlue" />
      </Flex>

      <Highlight className="js">
        {`<Flex bg="lightBlue" flexDirection={{small: "column", medium: "row"}}>
  <Box width={1/2} p="x3" m="x3" bg="blackBlue"></Box>
  <Box width={1/2} p="x3" m="x3" bg="darkBlue"></Box>
</Flex>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text>Because Flex is an extension of <Link href="/components/box">Box</Link> it accepts all the same props but adds the following:</Text>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td width="100px">Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>alignItems</td>
            <td>String</td>
            <td>stretch</td>
            <td>Sets align-items. Accepts flex-start, flex-end, center, or stretch.</td>
          </tr>
          <tr>
            <td>flexDirection</td>
            <td>String</td>
            <td>row</td>
            <td>Set the flex-direction. Accepts row, column, row-reverse or column-reverse</td>
          </tr>
          <tr>
            <td>flexWrap</td>
            <td>String</td>
            <td>no-wrap</td>
            <td>Set the flex-wrap. Accepts no-wrap, wrap, or wrap-reverse</td>
          </tr>
          <tr>
            <td>justifyContent</td>
            <td>String</td>
            <td>flex-start</td>
            <td>Sets justify-content. Accepts flex-start, flex-end, center, space-around, or space-evenly</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/box">Box</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Flex">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
