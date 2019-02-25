import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, SubsectionTitle, Title,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection, CheckList, Image,
} from "../../components";
import anatomy from "../../images/checkbox/checkbox-anatomy.png";
import basic from "../../images/checkbox/checkbox-basic.png";
import defaultState from "../../images/checkbox/checkbox-default.png";
import checked from "../../images/checkbox/checkbox-checked.png";
import disabled from "../../images/checkbox/checkbox-disabled.png";

export default () => (
  <Layout>
    <Helmet>
      <title>Checkbox</title>
    </Helmet>
    <Box
      bg="whiteGrey" p="x4" borderRadius={ 1 }
      mb="x6"
    >
      <Title mb="none">Checkbox</Title>
      <Intro>Checkboxes allow users to select any number of options from a list.</Intro>
    </Box>
    <DocSection>
      <Image src={ basic } width="75%" alt="Text input screenshot" />
    </DocSection>
    <DocSection>
      <SectionTitle>Anatomy</SectionTitle>
      <Image src={ anatomy } width="50%" alt="Text input screenshot" />
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <CheckList>Users should be able to select the checkbox by clicking on the box directly or by clicking on its label.</CheckList>
      <CheckList>If there are many items in a list, consider using a "Show all" button</CheckList>
    </DocSection>
    <DocSection>
      <SectionTitle>States</SectionTitle>
      <SubsectionTitle>Default</SubsectionTitle>
      <Image src={ defaultState } width="50%" alt="Text input screenshot" />
      <SubsectionTitle>Checked</SubsectionTitle>
      <Image src={ checked } width="50%" alt="Text input screenshot" />
      <SubsectionTitle>Disabled</SubsectionTitle>
      <Image src={ disabled } width="50%" alt="Text input screenshot" />
    </DocSection>
  </Layout>
);
