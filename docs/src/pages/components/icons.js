import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Icon, Box, Flex, SectionTitle, Title, Link,
} from "@nulogy/components";
import icons from "@nulogy/components/icons/icons.json";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";

const iconNames = Object.keys(icons);

const IconDisplay = props => (
  <Flex flexWrap="wrap" { ...props }>
    {iconNames.map(icon => (
      <Flex key={ icon } width={ 1 / 5 }>
        <Icon icon={ icon } />
        <Text align="center" ml="x1">{icon}</Text>
      </Flex>
    ))}
  </Flex>
);

export default () => (
  <Layout>
    <Helmet>
      <title>Icons</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Icons</Title>
      <Intro>Icons can be used alongside text to help assist users in finding certain actions on a page. </Intro>
    </Box>

    <DocSection>
    <Icon icon="user" />
    <Highlight className="jsx">
          {`import { Icon } from @nulogy-components;

<Icon icon="user" />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Avaliable Icons</SectionTitle>
      <Text mb="x4">Nulogy uses a selection of solid style <Link href="https://material.io/tools/icons/?style=baseline"> Material Design</Link> icons. </Text>
      <IconDisplay mb="x2" />
      <Text>If your interface requires an icon not listed here, please post a message in the <Link href="slack://channel?id=CBAFQ4X7X/">#design-system</Link> slack channel.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <CheckList>Avoid using icons without labels unless the meaning is ubiquitous, like print</CheckList>
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
            <td>color</td>
            <td>String</td>
            <td>currentcolor</td>
            <td>The icon's colour, if different than parent's text colour.</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>The icon you'd like to display. Accepts icons listed in <em>Available Icons</em> above.</td>
          </tr>
          <tr>
            <td>size</td>
            <td>Number</td>
            <td>24px</td>
            <td>Size of the icon.</td>
          </tr>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>null</td>
            <td>Alternative text to be read by assistive devices. Leave blank if icon is purely decorative.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <Link href="https://storybook.nulogy.design/?selectedKind=Icon">View in Storybook</Link>
      <Text>For more information on icon usability and recognition, see this study from Nielsen Norman Group: <Link href="https://www.nngroup.com/articles/icon-usability/">Icon Usability.</Link></Text>
    </DocSection>
  </Layout>
);
