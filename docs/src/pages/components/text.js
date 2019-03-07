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
      <title>Text</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Text</Title>
      <Intro>Text allows you to control the font family, size colour, weight, line-height and alignment.</Intro>
    </Box>

    <DocSection>
      <Text>Sample text</Text>
      <Highlight className="js">
        {`import { Text } from @nulogy-components;

<Text>Sample text</Text>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Alignment</SubsectionTitle>
        <Text textAlign="right">Right-aligned text</Text>
        <Highlight className="js">
          {"<Text textAlign=\"right\">Right-aligned text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Colour</SubsectionTitle>
        <Text color="blue">Blue text</Text>
        <Highlight className="js">
          {"<Text color=\"blue\">Blue text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Monospace</SubsectionTitle>
        <Text fontFamily="mono">Monospace text</Text>
        <Highlight className="js">
          {"<Text fontFamily=\"mono\">Monospace text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Size</SubsectionTitle>
        <Text fontSize="largest">Text with a custom size</Text>
        <Highlight className="js">
          {"<Text fontSize=\"large\">Large text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Weight</SubsectionTitle>
        <Text fontWeight="bold">Bold text</Text>
        <Highlight className="js">
          {"<Text fontWeight=\"bold\">Bold text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Line-height</SubsectionTitle>
        <Text lineHeight={ 2 }>Double-spaced text</Text>
        <Text lineHeight={ 2 }>Double-spaced text</Text>
        <Highlight className="js">
          {`<Text lineHeight={2}>Double-spaced text</Text>
<Text>Double-spaced text</Text>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive</SectionTitle>
      <Text>All Text props can be used responsively by using an object that defines small, medium and/or large, based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.breakpoints</Link> object</Text>
      <Text>This example displays columns on small screens and rows on large ones.</Text>
      <Text color={ { small: "red", medium: "blue", large: "green" } }>Green text on large screens, blue on medium and red on small.</Text>
      <Highlight className="js">
        {`<Text color={{ small: "red", medium: "blue", large: "green"}}>
  Green text on large screens, blue on medium and red on small.
</Text>`}
      </Highlight>
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
            <td>color</td>
            <td>string</td>
            <td>Sets color based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.color</Link> object</td>
          </tr>
          <tr>
            <td>fontSize</td>
            <td>string</td>
            <td>Sets font size based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.fontSize</Link> object</td>
          </tr>
          <tr>
            <td>fontFamily</td>
            <td>string</td>
            <td>Sets font family based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.fontFamily</Link> object</td>
          </tr>
          <tr>
            <td>lineHeight</td>
            <td>string</td>
            <td>Sets line height based on the <Link href="https://github.com/nulogy/design-system/blob/master/components/src/theme.js">theme.lineHeight</Link> object</td>
          </tr>
          <tr>
            <td>textAlign</td>
            <td>string</td>
            <td>Sets text-align to either left, center or right</td>
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
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/headings">Headings</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/selectedKind=Text">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
