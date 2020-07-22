/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Alert,
  Box,
  NavBar,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Text
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  KeyTable
} from "../../components";

const primaryMenu = [
  {
    name: "Dashboard",
    items: [{ name: "Customers", href: "/" }, { name: "Invoices", href: "/" }]
  }
];

const secondaryMenu = [
  {
    name: "Settings",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" }
    ]
  }
];

const search = {
  onSubmit: () => {}
};

const propsRows = [
  {
    name: "menuData",
    type: "object",
    defaultValue: "null",
    description:
      "Data used to build link heirarchy and search functionality. See menuData Prop section below."
  },
  {
    name: "subtext",
    type: "string",
    defaultValue: "null",
    description: "The subtext under the logo."
  },
  {
    name: "brandingLinkHref",
    type: "string",
    defaultValue: "/",
    description: "The link href for the logo."
  },
  {
    name: "breakpointUpper",
    type: "number",
    defaultValue: "1024",
    description:
      "Provides the breakpoint where menu items will be collapsed into a dropdown menu."
  },
  {
    name: "breakpointLower",
    type: "number",
    defaultValue: "768",
    description:
      "Provides the breakpoint where the logo is collapsed from wordmark to lettermark."
  },
  {
    name: "themeColor",
    type: "string",
    defaultValue: "blue",
    description: 'Color themeing of NavBar component, either "blue" or "white".'
  }
];

const menuDataKeyRows = [
  {
    name: "primaryMenu",
    type: "array of menu item objects",
    description:
      "Data to the main navigation menu, aligned to the left of the NavBar."
  },
  {
    name: "secondaryMenu",
    type: "array of menu item objects",
    description:
      "Data to the secondary navigation menu, aligned to the right of the NavBar."
  },
  {
    name: "search",
    type: "object",
    description: "Object's onSubmit key provides onSubmit to search."
  }
];

const menuItemKeyRows = [
  {
    name: "name",
    type: "string | node (required)",
    description: "Unique identifier for the menu item."
  },
  {
    name: "ariaLabel",
    type: "string",
    description:
      "Add an aria-label if the `name` value is not a readable label, like an icon."
  },
  {
    name: "href",
    type: "string",
    description:
      "URL or link to an element similar to a standard <a> tag, this causes the menu item to render as a link within the NavBar."
  },
  {
    name: "items",
    type: "array",
    description:
      "Array of menu item objects. This causes the menu item to render as a dropdown in desktop view or as a heading in mobile view."
  },
  {
    name: "render",
    type: "function",
    description:
      "Function that returns JSX. This causes the menu item to render as the JSX provided wrapped in a component that provides styling and an onClick handler to close the menu. NOTE: Do not use `href` and `items` keys if you intend to use the render function."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Navbar</title>
    </Helmet>
    <Intro>
      <Title>Navbar</Title>
      <IntroText>
        The NavBar holds the navigation for Nulogy applications and a global
        search.
      </IntroText>
      <Alert type="danger" title="This component is being deprecated" mt="x2">
        We're replacing this component with{" "}
        <Link href="../branded-navbar">BrandedNavBar.</Link> Please use that
        instead. If you're currently using this version of the NavBar and need
        assistance upgrading, reach out to the Design Ops team.
      </Alert>
    </Intro>

    <DocSection>
      <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />
      <Highlight className="js">
        {`import {NavBar} from "@nulogy/components";

const primaryMenu = [
  {
    name: 'Dashboard',
    items: [
      { name: 'Customers', href: '/' },
      { name: 'Invoices', href: '/' },
    ],
  },
  { name: 'Link', href: '/' },
];

const secondaryMenu = [
  {
    name: 'Settings',
    items: [
      { name: 'Permissions', href: '/' },
      { name: 'Manage account', href: '/' },
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
        <NavBar menuData={{ primaryMenu }} />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu } } />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With search</SubsectionTitle>
        <NavBar menuData={{ primaryMenu, search }} />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu, search } } />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With secondary menu</SubsectionTitle>
        <NavBar menuData={{ primaryMenu, search, secondaryMenu }} />
        <Highlight className="js">
          {`<NavBar menuData={ { primaryMenu, secondaryMenu, search } } />`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <Box mb="x6">
        <SectionTitle>menuData Prop</SectionTitle>
        <Text>
          The menuData prop is used to provide links to the NavBar, assemble
          their heirarchy, and provide the search field's onSubmit handler. The
          direct children in the menuData object are shown below:
        </Text>
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
        <KeyTable keyRows={menuDataKeyRows} />
        <Text my="x2">
          Not providing data for primaryMenu, secondaryMenu or search will
          result in those components not being included.
        </Text>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Adding menu items</SubsectionTitle>

        <Text mb="x2">
          Both primaryMenu and secondaryMenu expect an array of objects. Each
          object represents a link or a heading to a group of links under it,
          with the following shape:
        </Text>
        <Highlight className="js">
          {`const primaryMenu = [
  {
    name = "string",
    href = "/",      // optional
    render = ()=>(), // optional
    items = [],      // optional
  },
]
`}
        </Highlight>
        <Text mb="x2">
          Each menu item object requires a "name" key. The "name" key will be
          used as the label for the menu item unless a "render" key is used.
          Adding "items" to the menu item object will render a dropdown with the
          specified items.
        </Text>
        <Text mb="x2">
          Menu items can be nested within eachother using the items key for as
          many levels of heirarchy that is needed.
        </Text>
        <KeyTable keyRows={menuItemKeyRows} />
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/navbar--navbar">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
