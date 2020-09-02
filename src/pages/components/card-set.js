import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle,
  Title,
  Card,
  CardSet,
  Link,
  ListItem,
  List
} from "@nulogy/components";
import { Layout, Intro, IntroText, DocSection } from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

export default () => (
  <Layout>
    <Helmet>
      <title>Cart Set</title>
    </Helmet>
    <Intro>
      <Title>Card Set</Title>
      <IntroText>
        Card set groups cards of the same category and provides spacing between
        cards.
      </IntroText>
    </Intro>
    <DocSection>
      <CardSet>
        <Card>I am a 1st card in a cardset.</Card>
        <Card>I am a 2nd card in a cardset.</Card>
        <Card>I am a 3rd card in a cardset.</Card>
      </CardSet>
      <Highlight className="js">
        {`<CardSet>
    <Card>I am a 1st card in a cardset.</Card>
    <Card>I am a 2nd card in a cardset.</Card>
    <Card>I am a 3rd card in a cardset.</Card>
</CardSet>`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/card">Card</Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}card--cardset`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
