/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, NavBar, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection, PropsTable,
} from "../../components";

const primaryMenu = [
  {
    name: 'Dashboard',
    items: [
      { name: 'Customers', description: 'description', href: '/' },
      { name: 'Invoices', description: 'description', href: '/' },
    ],
  },
];

const secondaryMenu = [
  {
    name: 'Settings',
    items: [
      { name: 'Permissions', description: 'description', href: '/' },
      { name: 'Manage account', description: 'description', href: '/' },
    ],
  },
];

const search = {
  onSubmit: () => {},
};

const propsRows = [
  {
    name: "menuData", type: "object", defaultValue: "", description: "",

  },
];

export default () => (
  <Layout>
    <Helmet>
      <title>Navbar</title>
    </Helmet>
    <Intro>
      <Title>Navbar</Title>
      <IntroText>The NavBar holds the navigation for Nulogy applications and a global search.</IntroText>
    </Intro>

    <DocSection>
      <NavBar menuData={ { primaryMenu, secondaryMenu, search } } />
      <Highlight className="js">
        {`import {NavBar} from @nulogy/components;

const primaryMenu = [
  {
    name: 'Dashboard',
    items: [
      { name: 'Customers', description: 'description', href: '/' },
      { name: 'Invoices', description: 'description', href: '/' },
    ],
  },
  { name: 'Link', href: '/' },
];

const secondaryMenu = [
  {
    name: 'Settings',
    items: [
      { name: 'Permissions', description: 'description', href: '/' },
      { name: 'Manage account', description: 'description', href: '/' },
    ],
  },
];

const search = {
  onSubmit: () => {},
};

<NavBar menuData={ { primaryMenu, secondaryMenu, search } } />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Primary menu only</SubsectionTitle>
        <NavBar menuData={ { primaryMenu } } />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu } } />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With search</SubsectionTitle>
        <NavBar menuData={ { primaryMenu, search } } />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu, search } } />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With secondary menu</SubsectionTitle>
        <NavBar menuData={ { primaryMenu, search, secondaryMenu } } />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu, secondaryMenu, search } } />`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/selectedKind=NavBar">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
