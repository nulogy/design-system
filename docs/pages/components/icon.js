import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Icon,
  Flex,
  SectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import icons from "@nulogy/icons";

import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "color",
    type: "String",
    defaultValue: "currentcolor",
    description: "The icon's colour, if different than parent's text colour."
  },
  {
    name: "icon",
    type: "String",
    defaultValue: "Required",
    description:
      "The icon to display. Accepts icons listed in Available Icons above."
  },
  {
    name: "size",
    type: "String",
    defaultValue: "24px",
    description: "The size of the icon"
  },
  {
    name: "title",
    type: "String",
    defaultValue: "null",
    description:
      "Alternative text to be read by assistive devices. Leave blank if icon is purely decorative."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the svg element."
  }
];

const iconNames = Object.keys(icons);

const IconDisplay = props => (
  <Flex flexWrap="wrap" {...props}>
    {iconNames.map(icon => (
      <Flex key={icon} width={{ extraSmall: 1 / 2, medium: 1 / 3 }}>
        <Icon icon={icon} />
        <Text align="center" ml="x1">
          {icon}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default () => (
  <Layout>
    <Helmet>
      <title>Icons</title>
    </Helmet>
    <Intro>
      <Title>Icons</Title>
      <IntroText>
        Icons can be used alongside text to help assist users in finding certain
        actions on a page.{" "}
      </IntroText>
    </Intro>

    <DocSection>
      <Icon icon="user" />
      <Highlight className="js">
        {`import { Icon } from "@nulogy/components";

<Icon icon="user" />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Avaliable Icons</SectionTitle>
      <Text mb="x4">
        Nulogy uses a selection of solid style{" "}
        <Link href="https://material.io/tools/icons/?style=baseline">
          {" "}
          Material Design
        </Link>{" "}
        icons.{" "}
      </Text>
      <IconDisplay mb="x2" />
      <Text>
        If your interface requires an icon not listed here, please post a
        message in the{" "}
        <Link href="slack://channel?id=CBAFQ4X7X/">#design-system</Link> slack
        channel.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <List>
        <ListItem>
          Avoid using icons without labels unless the meaning is ubiquitous,
          like print
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/icon--icon">
            View in Storybook
          </Link>
        </ListItem>
        <ListItem>
          <Text>
            For more information on icon usability and recognition, see this
            study from Nielsen Norman Group:{" "}
            <Link href="https://www.nngroup.com/articles/icon-usability/">
              Icon Usability.
            </Link>
          </Text>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
