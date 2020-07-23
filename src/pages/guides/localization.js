import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  ALL_NDS_LOCALES,
  Link,
  SectionTitle,
  Title,
  Table
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Localization</title>
    </Helmet>
    <Intro>
      <Title>Localization</Title>
      <IntroText>
        Learn about localization with Nulogy Design System (NDS).
      </IntroText>
    </Intro>

    <DocSection>
      <SectionTitle>Localization using NDS Components</SectionTitle>
      <Text>
        NDS components include some default strings for commonly used labels and
        aria-labels.
      </Text>
      <Text>
        To pass a locale to NDSProvider, locate the NDSProvider within your app
        and pass in the locale prop.
      </Text>
      <Highlight className="js">{`<NDSProvider locale={yourLocale}>{ App }</NDSProvider>`}</Highlight>
      <Text>
        The default language used by these strings is English (US) unless a
        different locale is passed to the NDSProvider. All strings within NDS
        can be overridden using the component's props.
      </Text>
      <Text>
        To see an example of a localized component, go to the{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/pagination--pagination">
          Pagination Component
        </Link>{" "}
        using the "Knobs" section you should be able to select an NDS Provider
        Locale from a dropdown and observe the labels translate according to the
        selected locale.
      </Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Available NDS Locales</SectionTitle>
      <Text>
        Below is a list of all locales currently accepted by NDSProvider. Use
        the "Locale Prop Value" as the string value to pass to NDSProvider's
        locale prop.
      </Text>
      <Table
        columns={[
          { label: "Language", dataKey: "label" },
          { label: "Locale Prop Value", dataKey: "value" }
        ]}
        rows={ALL_NDS_LOCALES}
      />
      <Text mt="x2">
        Note that if your application supports Simplified Chinese, you'll also
        need to load the{" "}
        <Link href="https://www.google.com/get/noto/">Noto Sans SC</Link> font.
        For more information, see the{" "}
        <Link href="https://github.com/nulogy/design-system/blob/master/components/README.md#2-add-fonts">
          README
        </Link>
        .
      </Text>
    </DocSection>
  </Layout>
);
