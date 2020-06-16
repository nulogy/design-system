import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  BrandedNavBar
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  KeyTable,
  InlineCode
} from "../../components";

import sampleLogo from "../../images/loremipsum.svg";

const propsRows = [
  {
    name: "menuData",
    type: "object",
    defaultValue: "null",
    description:
      "Data used to build link heirarchy functionality. See menuData Prop section below."
  },
  {
    name: "subtext",
    type: "string",
    defaultValue: "null",
    description: "The subtext under the Nulogy logo."
  },
  {
    name: "brandingLinkHref",
    type: "string",
    defaultValue: "/",
    description: "A custom link for the logo."
  },
  {
    name: "breakpointUpper",
    type: "number",
    defaultValue: "1024",
    description:
      "Provides the breakpoint where menu items will be collapsed into a dropdown menu."
  },
  {
    name: "logo",
    type: "string",
    defaultValue: "undefined",
    description: "A path to a logo file"
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

export default () => (
  <Layout>
    <Helmet>
      <title>Branded NavBar</title>
    </Helmet>
    <Intro>
      <Title>Branded NavBar</Title>
      <IntroText>
        A light navigation bar that can optionally support a customer's logo.
      </IntroText>
    </Intro>

    <DocSection>
      <BrandedNavBar
        menuData={{ primaryMenu, secondaryMenu }}
        breakpointUpper={0}
      />
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

<BrandedNavBar menuData={ { primaryMenu, secondaryMenu } } />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <SubsectionTitle>With a customer logo</SubsectionTitle>
      <Text>
        Providing a path to a logo via the <InlineCode>logo</InlineCode> prop
        will replace the logo on the left with a customer's, and add a Nulogy
        tag to the right side of the menu.
      </Text>
      <BrandedNavBar
        menuData={{ primaryMenu, secondaryMenu }}
        breakpointUpper={0}
        subtext="Quality control"
        logo={sampleLogo}
      />

      <Highlight className="js">
        {`<BrandedNavBar
  menuData={{ primaryMenu, secondaryMenu }}
  subtext="Quality control"
  logo="../path-to-/sample-logo.png"
/>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <Box mb="x6">
        <SectionTitle>menuData Prop</SectionTitle>
        <Text>
          The menuData prop is used to provide links to the NavBar and assemble
          their heirarchy. The direct children in the menuData object are shown
          below:
        </Text>
        <Highlight className="js">
          {`const menuData = {
  primaryMenu: [],
  secondaryMenu: [],
}
`}
        </Highlight>
        <KeyTable keyRows={menuDataKeyRows} />
        <Text my="x2">
          Not providing data for primaryMenu, secondaryMenu will result in those
          components not being included.
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
          <Link href="https://storybook.nulogy.design/?path=/story/brandednavbar--brandednavbar">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
