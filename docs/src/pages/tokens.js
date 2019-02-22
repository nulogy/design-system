import React from "react";
import { Helmet } from "react-helmet";
import { Box, Title, Link } from "@nulogy/components";
import { Layout, Intro, DocSection } from "../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Tokens</title>
    </Helmet>
    <Box
      bg="whiteGrey" p="x6" borderRadius={ 1 }
      mb="x6"
    >
      <Title mb="none">Tokens</Title>
      <Intro>Here you'll find all of the design options for creating interfaces in Nulogy's style.</Intro>
    </Box>

    <DocSection>
            Tokens can currently be found in the `/src/` folder of the <Link href="https://github.com/nulogy/design-system/tree/master/tokens/">@nulogy/tokens</Link> package.
    </DocSection>
  </Layout>
);
