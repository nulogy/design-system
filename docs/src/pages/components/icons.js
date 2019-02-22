import React from "react";
import { Helmet } from "react-helmet";
import {
  Icon, Box, Flex, SectionTitle, Title, Link,
} from "@nulogy/components";
import icons from "@nulogy/components/icons/icons.json";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";

const iconNames = Object.keys(icons);

const IconDisplay = props => (
  <Flex flexWrap="wrap" { ...props }>
    {iconNames.map(icon => (
      <Flex key={ icon } width={ 1 / 5 }>
        <Icon icon={ icon } />
        <Text align="center" ml="x1">{icon}</Text>
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
      bg="whiteGrey" p="x4" borderRadius={ 1 }
      mb="x6"
    >
      <Title m="none">Icons</Title>
      <Intro>Icons can be used alongside text to help assist users in finding certain actions on a page. </Intro>
    </Box>

    <DocSection>
      <SectionTitle>Avaliable Icons</SectionTitle>
      <Text mb="x4">Nulogy uses a selection of solid style <Link href="https://material.io/tools/icons/?style=baseline"> Material Design</Link> icons. </Text>
      <IconDisplay mb="x2" />
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
  </Layout>
);
