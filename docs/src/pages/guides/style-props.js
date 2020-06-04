import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Alert,
  Title,
  Link,
  List,
  ListItem,
  Table
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  InlineCode
} from "../../components";

import { propName, smallTextRenderer } from "../../components/PropsTable";

const columns = [
  {
    label: "Category",
    dataKey: "category",
    width: "20%",
    cellRenderer: propName
  },
  {
    label: "Props",
    dataKey: "props",
    width: "80%",
    cellRenderer: smallTextRenderer
  }
];

const rows = [
  {
    category: "space",
    props:
      "margin, marginTop, marginRight, marginBottom, marginLeft, marginX, marginY, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingX, paddingY, m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py,"
  },
  {
    category: "layout",
    props:
      "width, height, minWidth, minHeight, maxWidth, maxHeight, display, verticalAlign, size"
  },
  {
    category: "typography",
    props:
      "fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStyle, textAlign"
  },
  {
    category: "colour",
    props: "color, backgroundColor, bg"
  },
  {
    category: "border",
    props:
      "border, borderWidth, borderStyle, borderColor, borderRadius, borderTop, borderRight, borderBottom, borderLeft, borderX, borderY,"
  },
  {
    category: "position",
    props: "position, zIndex, top, right, bottom, left"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Style props</title>
    </Helmet>
    <Intro>
      <Title>Style props</Title>
      <IntroText>
        Nulogy's components use styled-system to apply groups of style props to
        different types of components. These props correspond to their css
        equivalents and allow individual manipulation of a component's style.
      </IntroText>
    </Intro>

    <DocSection>
      <SectionTitle>Prop Categories</SectionTitle>
      <Table columns={columns} rows={rows} rowHovers={false} />
      <Text mt="x3">
        For more information on each of these props, see the{" "}
        <Link href="https://github.com/styled-system/styled-system/blob/master/docs/table.md">
          styled-system docs
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Usage</SectionTitle>
      <Text>
        To see which props each component includes, see that component's
        documentation. But in general, the following rules apply:
      </Text>
      <List mb="x3">
        <ListItem>
          Block-level components (Alerts, Buttons, Cards, etc.) have access to{" "}
          <InlineCode>space</InlineCode> props.
        </ListItem>
        <ListItem>
          Text components (Text, Headings, Link) also have access to{" "}
          <InlineCode>typography</InlineCode> and{" "}
          <InlineCode>colour</InlineCode> props.
        </ListItem>
        <ListItem>
          The Box component has access to <InlineCode>layout</InlineCode> props
          and can be used to add <InlineCode>borders</InlineCode>,{" "}
          <InlineCode>colours</InlineCode>, and{" "}
          <InlineCode>boxShadows</InlineCode> around anything.
        </ListItem>
      </List>
      <Alert mt="x3">
        Note that inputs don't have access to any of these props because they're
        already pre-composed. To stack multiple inputs with proper spacing on
        top of each other, wrap them in the{" "}
        <Link href="/components/form">Form</Link> component.
      </Alert>
    </DocSection>
    <DocSection>
      <SectionTitle>Theme</SectionTitle>
      Styled-system will check the <Link href="/theme">theme</Link> and use that
      if a key matches, e.g setting a <InlineCode>textColor</InlineCode> to{" "}
      <InlineCode>blue</InlineCode> will display Nulogy's{" "}
      <InlineCode>#216beb</InlineCode>, instead of the html default. If a key
      can't be found, it will be processed as a CSS value.
    </DocSection>
  </Layout>
);
