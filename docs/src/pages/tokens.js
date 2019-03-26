import React from "react";
import { Helmet } from "react-helmet";
import { Box, Title, Link } from "@nulogy/components";
import { Layout, Intro, IntroText, DocSection } from "../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Tokens</title>
    </Helmet>
    <Intro>
      <Title>Tokens</Title>
      <IntroText>Here you'll find all of the design options for creating interfaces in Nulogy's style.</IntroText>
    </Intro>

    <DocSection>
            Tokens can currently be found in the `/src/` folder of the <Link href="https://github.com/nulogy/design-system/tree/master/tokens/">@nulogy/tokens</Link> package.
    </DocSection>
  </Layout>
);
