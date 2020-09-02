import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle,
  Title,
  Card,
  Link,
  ListItem,
  List
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

export default () => (
  <Layout>
    <Helmet>
      <title>Card</title>
    </Helmet>
    <Intro>
      <Title>Card</Title>
      <IntroText>
        Cards provide container for related set of information.
      </IntroText>
    </Intro>
    <DocSection>
      <Card> I am a card.</Card>
      <Highlight className="js">{`<Card>I am a card.</Card>`}</Highlight>
    </DocSection>
    <DocSection>
      <Text>
        Card extends <Link href="/components/box">Box</Link> component.
      </Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text>
        Because Card is an extension of <Link href="/components/box">Box</Link>{" "}
        component it accepts all the same props.
      </Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/card-set">Card Set</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/box">Box</Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}card--card`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
