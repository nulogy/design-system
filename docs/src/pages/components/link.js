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
      <title>Link</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Link</Title>
      <Intro>A styled <em>a</em> tag that can be used to send users to a URL.</Intro>
    </Box>

    <DocSection>
      <Link href="http://nulogy.design">nulogy.design</Link>
      <Highlight className="js">
        {`import { Link } from @nulogy-components;

<Link href="http://nulogy.design">nulogy.design</Link>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Without an underline</SubsectionTitle>
        <Link href="http://nulogy.design" underline={ false }>nulogy.design</Link>
        <Highlight className="js">
          {"<Link href=\"http://nulogy.design\" underline=\"false\">nulogy.design</Link>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>With a custom colour</SubsectionTitle>
        <Link color="black" hover="red" href="http://nulogy.design">nulogy.design</Link>
        <Highlight className="js">
          {"<Link color=\"black\" hover=\"red\" href=\"http://nulogy.design\">nulogy.design</Link>"}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>href</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>The location you'd like to send someone after clicking.</td>
          </tr>
          <tr>
            <td>color</td>
            <td>String</td>
            <td>blue</td>
            <td>A custom colour to display the link in.</td>
          </tr>
          <tr>
            <td>hover</td>
            <td>String</td>
            <td>darkBlue</td>
            <td>A custom hover colour.</td>
          </tr>
          <tr>
            <td>underline</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Whether to show an underline or not.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Link">View in Storybook</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/buttons">Buttons</Link></ListItem>
    </DocSection>    
  </Layout>
);
