import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Headings</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Headings</Title>
      <Intro>There are three level of headings available to provide hierarchy in an application.</Intro>
    </Box>

    <DocSection>
      <Title>Title</Title>
      <SectionTitle>SectionTitle</SectionTitle>
      <SubsectionTitle>SubsectionTitle</SubsectionTitle>
      <Highlight className="js">
        {`import { Title, SectionTitle, SubsectionTitle } from @nulogy-components;

<Title>Title</Title>
<SectionTitle>SectionTitle</SectionTitle>
<SubsectionTitle>SubsectionTitle</SubsectionTitle>
`}
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
            <td>textAlign</td>
            <td>string</td>
            <td>Sets text-align to either left, center or right</td>
          </tr>
        </tbody>
      </table>
    </DocSection>


    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/text">Text</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Headings">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
