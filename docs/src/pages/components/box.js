import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Box</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Box</Title>
      <Intro>A layout component for controlling width, margin, padding and colour.</Intro>
    </Box>

    <DocSection>
      <Box bg="darkBlue" color="white" p="x3">Box</Box>
      <Highlight className="js">
        {`import { Box } from @nulogy-components;

<Box bg="darkBlue" color="white" p="x3">Box</Box>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Width</SubsectionTitle>
        <Text>Width can be set using a fraction or string.</Text>
        <Box bg="lightBlue" p="x3" width={ 1 / 2 }>Half</Box>
        <Box bg="lightBlue" p="x3" width="400px">400px</Box>
        <Highlight className="js">
          {`<Box width={1/2}>Half</Box>
<Box width="400px">400px</Box>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Text Color</SubsectionTitle>
        <Text>Color can be set using a reference to the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.colors</Link> object.</Text>
        <Box color="blue">blue</Box>
        <Highlight className="js">
          {"<Box color=\"blue\">blue</Box>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Background Color</SubsectionTitle>
        <Text>Color can be set using a reference to the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.colors</Link> object.</Text>
        <Box bg="lightBlue">lightBlue</Box>
        <Highlight className="js">
          {"<Box bg=\"lightBlue\">lightBlue</Box>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Margins</SubsectionTitle>
        <Text>Margins can be set using a reference to the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.space</Link> object.</Text>
        <Box bg="lightBlue" m="x3">x3 (24px)</Box>
        <Highlight className="js">
          {"<Box m=\"x3\">x3</Box"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Padding</SubsectionTitle>
        <Text>Padding can be set using a reference to the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.space</Link> object.</Text>
        <Box bg="lightBlue" p="x3">x3 (24px)</Box>
        <Highlight className="js">
          {"<Box p=\"x3\">x3</Box"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Responsive</SubsectionTitle>
        <Text>All Box props can be used responsively by using an object that defines small, medium and/or large, based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.breakpoints</Link> object</Text>
        <Box color={ { small: "red", medium: "blue", large: "green" } }>Green text on large screens, blue on medium and red on small.</Box>
        <Highlight className="js">
          {`<Box color={{ small: "red", medium: "blue", large: "green"}}>
  Green text on large screens, blue on medium and red on small.
</Box>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td width="100px">Prop</td>
            <td>Type</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bg</td>
            <td>string</td>
            <td>Sets background-color based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.color</Link> object</td>
          </tr>
          <tr>
            <td>color</td>
            <td>string</td>
            <td>Sets color based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.color</Link> object</td>
          </tr>
          <tr>
            <td>display</td>
            <td>string</td>
            <td>Sets css display property.</td>
          </tr>
          <tr>
            <td>height</td>
            <td>string</td>
            <td>Sets a height on the box.</td>
          </tr>
          <tr>
            <td>minHeight</td>
            <td>string</td>
            <td>Sets a height on the box.</td>
          </tr>
          <tr>
            <td>maxHeight</td>
            <td>string</td>
            <td>Sets a maxHeight on the box.</td>
          </tr>
          <tr>
            <td>m</td>
            <td>string</td>
            <td>Sets margin based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.space</Link> object</td>
          </tr>
          <tr>
            <td>mt</td>
            <td>string</td>
            <td>Sets margin-top</td>
          </tr>
          <tr>
            <td>mr</td>
            <td>string</td>
            <td>Sets margin-right</td>
          </tr>
          <tr>
            <td>mb</td>
            <td>string</td>
            <td>Sets margin-bottom</td>
          </tr>
          <tr>
            <td>ml</td>
            <td>string</td>
            <td>Sets margin-left</td>
          </tr>
          <tr>
            <td>mx</td>
            <td>string</td>
            <td>Sets margin-left and margin-right</td>
          </tr>
          <tr>
            <td>my</td>
            <td>string</td>
            <td>Sets margin-top and margin-bottom</td>
          </tr>
          <tr>
            <td>order</td>
            <td>number</td>
            <td>Sets the order to be used with <Link href="/components/flex">Flex</Link> component</td>
          </tr>
          <tr>
            <td>position</td>
            <td>string</td>
            <td>Sets css position property.</td>
          </tr>
          <tr>
            <td>p</td>
            <td>string</td>
            <td>Sets padding based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.space</Link> object</td>
          </tr>
          <tr>
            <td>pt</td>
            <td>string</td>
            <td>Sets padding-top</td>
          </tr>
          <tr>
            <td>pr</td>
            <td>string</td>
            <td>Sets padding-right</td>
          </tr>
          <tr>
            <td>pb</td>
            <td>string</td>
            <td>Sets padding-bottom</td>
          </tr>
          <tr>
            <td>pl</td>
            <td>string</td>
            <td>Sets padding-left</td>
          </tr>
          <tr>
            <td>px</td>
            <td>string</td>
            <td>Sets padding-left and padding-right</td>
          </tr>
          <tr>
            <td>py</td>
            <td>string</td>
            <td>Sets padding-top and padding-bottom</td>
          </tr>
          <tr>
            <td>width</td>
            <td>string</td>
            <td>Sets the width of the element</td>
          </tr>
          <tr>
            <td>minWidth</td>
            <td>string</td>
            <td>Sets the minWidth of the element</td>
          </tr>
          <tr>
            <td>maxWidth</td>
            <td>string</td>
            <td>Sets the maxWidth of the element</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/flex">Flex</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Box">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
