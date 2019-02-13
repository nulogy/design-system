import React from "react";
import { Helmet } from "react-helmet";
import {
  Icon, Box, Flex, SectionTitle, Title, Link,
} from "@nulogy/components";
import icons from "@nulogy/components/icons/icons.json";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList, ComponentUsage,
} from "../../components";

const iconNames = Object.keys(icons);

const IconDisplay = props => (
  <Flex flexWrap="wrap" { ...props }>
    {iconNames.map(icon => (
      <Flex key={ icon } width={ 1 / 5 }>
        <Icon icon={ icon } />
        <Text align="center" ml={ 2 }>{icon}</Text>
      </Flex>
    ))}
  </Flex>
);

export default () => (
  <Layout>
    <Helmet>
      <title>Icons</title>
    </Helmet>
    <Box
      bg="whiteGrey" p={ 5 } borderRadius={ 1 }
      mb={ 6 }
    >
      <Title m={ 0 }>Icons</Title>
      <Intro>Icons can be used alongside text to help assist users in finding certain actions on a page. </Intro>
    </Box>

    <DocSection>
      <SectionTitle>Avaliable Icons</SectionTitle>
      <Text mb={ 5 }>Nulogy uses a selection of solid style <Link href="https://material.io/tools/icons/?style=baseline"> Material Design</Link> icons. </Text>
      <IconDisplay mb={ 3 } />
      <Text>If your interface requires an icon not listed here, please post a message in the <Link href="slack://channel?id=CBAFQ4X7X/">#design-system</Link> slack channel.</Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <CheckList>Avoid using icons without labels unless the meaning is ubiquitous, like print</CheckList>
    </DocSection>
    <DocSection>
      <SectionTitle>Related</SectionTitle>
      <Text>For more information on icon usability and recognition, see this study from Nielsen Norman Group: <Link href="https://www.nngroup.com/articles/icon-usability/">Icon Usability.</Link></Text>
    </DocSection>
    <ComponentUsage storybookLink="http://localhost:8080/?selectedKind=Icon" source="/components/src/icon/icon.js" />
  </Layout>
);
