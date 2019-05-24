import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  DocSubsection
} from "../../components";
import newProject from "../../images/designers-guide/creating-project.gif";
import linkingNDS from "../../images/designers-guide/linking-NDS.gif";
import branching from "../../images/designers-guide/branching.gif";
import settings from "../../images/designers-guide/settings.gif";
import textStyle from "../../images/designers-guide/text-style.gif";
import symbol from "../../images/designers-guide/symbol.gif";
import colourStyle from "../../images/designers-guide/colour-style.gif";
import commiting from "../../images/designers-guide/commiting.gif";
import merging from "../../images/designers-guide/merging.gif";

export default () => (
  <Layout>
    <Helmet>
      <title>Designers' Guide</title>
    </Helmet>
    <Intro>
      <Title>Designers' Guide</Title>
      <IntroText>
        Learn how to start designing using the Nulogy Design System (NDS).
      </IntroText>
    </Intro>

    <DocSection>
      <SectionTitle>Tools and assets</SectionTitle>
      <Text>Designers at Nulogy use:</Text>
      <List>
        <ListItem>
          <Link href="https://www.sketch.com/">Sketch</Link> as our design tool
          for creating high-fidelity mockups
        </ListItem>
        <ListItem>
          <Link href="https://www.abstract.com/">Abstract</Link> for
          collaboration and version control of Sketch assets
        </ListItem>
        <ListItem>
          <Link href="https://www.ibm.com/plex/">IBM Plex</Link> as a Nulogy's
          sole typeface
        </ListItem>
        <ListItem>
          <Link href="https://share.goabstract.com/2b13ee68-fe6e-4b6e-a5da-8965050f4908">
            NDS UI kit
          </Link>{" "}
          as a library of styles, symbols, and templates
        </ListItem>
        <ListItem>
          <Link href="https://storybook.nulogy.design">Storybook</Link> as a
          component reference guide
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Understanding NDS visual language</SectionTitle>
      <Text>
        To be effective at using the Nulogy Design System designers should
        familiarize themselves with the basics of NDS visual language. The
        following articles provide a good starting point:
      </Text>
      <List>
        <ListItem>
          <Link href="/style/colour/">Colour</Link>
        </ListItem>
        <ListItem>
          <Link href="/style/spacing/">Spacing</Link>
        </ListItem>
        <ListItem>
          <Link href="/style/typography/">Typography</Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Designing with NDS</SectionTitle>
      <DocSubsection mb="x6">
        <SubsectionTitle>Starting a project</SubsectionTitle>
        <Text mb="x3">
          Creating a project in Abstract creates Sketch file and makes an
          initial commit to the master branch. By default, all projects are
          visible to all members of Nulogy organization. More about projects can
          be found{" "}
          <Link href="https://www.abstract.com/help/projects/">here</Link>.
        </Text>
        <img
          src={newProject}
          alt="Creating a new project in Abstract animation"
        />
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Linking NDS UI kit</SubsectionTitle>
        <Text mb="x3">
          To get access to NDS component symbols, and colour and layer styles
          you need to link the NDS-ui-kit.sketch library from the NDS project to
          your project. More about libraries can be found{" "}
          <Link href="https://www.abstract.com/help/libraries/">here</Link>.
        </Text>
        <img src={linkingNDS} alt="Linking NDS UI kit in Abstract animation" />
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Branching</SubsectionTitle>
        <Text mb="x3">
          Edits to Sketch files are done in the new branch that is created in
          Abstract. More about branching can be found{" "}
          <Link href="https://www.abstract.com/help/branches/">here</Link>.
        </Text>
        <img src={branching} alt="Branching in Abstract animation" />
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Adjusting Sketch settings</SubsectionTitle>
        <Text mb="x3">
          It’s helpful to have Nudging settings and Grid settings adjusted to
          NDS’s <Link href="/style/spacing/">spacing scale</Link>.
        </Text>
        <img src={settings} alt="Adjusting Sketch settings animation" />
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Working with NDS</SubsectionTitle>
        <Box mb="x3">
          <Text mb="x2" color="darkGrey">
            Text styles
          </Text>
          <img src={textStyle} alt="NDS text style animation" />
        </Box>
        <Box mb="x3">
          <Text mb="x2" color="darkGrey">
            Symbols
          </Text>
          <img src={symbol} alt="NDS symbol animation" />
        </Box>
        <Box mb="x3">
          <Text mb="x2" color="darkGrey">
            Layer styles
          </Text>
          <img src={colourStyle} alt="NDS layer style animation" />
        </Box>
        <Box mb="x3">
          <Text mb="x2" color="darkGrey">
            Templates
          </Text>
          <Text>Coming soon ...</Text>
        </Box>
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Committing changes</SubsectionTitle>
        <Text mb="x3">
          To keep design updates traceable changes should be committed after
          each meaningful change. More about committing can be found{" "}
          <Link href="https://www.abstract.com/help/commits/">here</Link>.
        </Text>
        <img src={commiting} alt="Commiting in Abstract animation" />
      </DocSubsection>
      <DocSubsection mb="x6">
        <SubsectionTitle>Merging</SubsectionTitle>
        <Text mb="x3">
          When the design is approved (Process TBD) it should be merged into the
          parent branch or master. More about merging can be found{" "}
          <Link href="https://www.abstract.com/help/merge-master/">here</Link>.
        </Text>
        <img src={merging} alt="Merging in Abstract animation" />
      </DocSubsection>
    </DocSection>
    <DocSection>
      <SectionTitle>Related resources</SectionTitle>
      <ListItem>
        <Link href="/guides/developers">Developer's guide</Link>
      </ListItem>
      <ListItem>
        <Link href="https://www.sketch.com/docs/">Sketch documentation</Link>
      </ListItem>
      <ListItem>
        <Link href="/https://www.abstract.com/help/">Abstract help center</Link>
      </ListItem>
    </DocSection>
  </Layout>
);
