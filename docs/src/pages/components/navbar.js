/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, NavBar, SectionTitle, SubsectionTitle, Title, Link, ListItem, Text
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection, PropsTable, KeyTable
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
    name: "menuData", type: "object", defaultValue: "null", description: "Provides data used to build link heirarchy and search functionality, see menuData Prop section below",
  },
];

const menuDataKeyRows = [
  {
    name: "primaryMenu", type: "array of Menu Item objects", description: "Provides data to the main navigation menu, aligned to the left of the NavBar",
  },
  {
    name: "secondaryMenu", type: "array of Menu Item objects", description: "Provides data to the secondary navigation menu, aligned to the right of the NavBar",
  },
  {
    name: "search", type: "object", description: "Object's onSubmit key provides onSubmit to search",
  },
];

const menuItemKeyRows = [
  {
    name: "name", type: "string", description: "Required string used as a unique identifier for the Menu Item",
  },
  {
    name: "href", type: "string", description: "Accepts a URl or link to an element similar to a standard <a> tag, this causes MenuItem to render as a link within the NavBar",
  },
  { 
    name: "render", type: "function", description: "Accepts a function that returns JSX, this causes Menu Item to render as the JSX provided wapped in a component that provides styling and an onClick handler to close the menu",
  },
  {
    name: "items", type: "array of Menu Item objects", description: "Accepts an array of menuItem objeccts, causes Menu Item to render as a dropdown in desktop view or as a heading in mobile view",
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
      <SectionTitle>menuData Prop</SectionTitle>
      <Text>The menuData prop is used to provide links to the NavBar, assemble their heirarchy, and provide the search field's onSubmit handler. The direct children in the menuData object are show below:</Text>
      <Highlight className="js">
{`const menuData = {
  primaryMenu: [],
  secondaryMenu: [],
  search: {
    onSubmit: () => (),
  },
}
`}
      </Highlight>
      <KeyTable mb="x2" keyRows={ menuDataKeyRows } />
      <Text>Choosing to not provide data for any of primaryMenu, secondaryMenu or search will result in those components of the NavBar not being included.</Text>
      <Text mb="x2">Both primaryMenu and secondaryMenu expect an array of "Menu Item" objects. A Menu Item object represents a link in the NavBar or a heading to a group of links under it. The Menu Item object has the following form:</Text>
      <Highlight className="js">
{`const primaryMenu = [
  {
    name = "string",
    href = "/",      //(optional)
    render = ()=>(), //(optional)
    items = [],      //(optional)
  },
]
`}
      </Highlight>
      <Text>Each Menu Item object requires the name key as a unique identifier as well as only one of the optional keys.</Text>
      <Text mb="x2">Menu Items can be nested within eachother using the items key for as many levels of heirarchy that is needed for link organization.</Text>
      <KeyTable keyRows={ menuItemKeyRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/selectedKind=NavBar">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
