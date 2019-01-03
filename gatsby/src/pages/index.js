import React from 'react'
import {Button, Box, Flex, Text, Title, SectionTitle} from '@nulogy/components';
import {Intro, Layout} from '../components/'

const IndexPage = () => (
  <Layout>
    <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
        <Title mb={3}>Nulogy Design System</Title>
        <Intro>The Nulogy Design System is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices.</Intro>
    </Box>

    <Flex>
        <Box boxShadow={0} mb={3} pr={3}>
            <SectionTitle mb={3}>Visual Style</SectionTitle>
            <Text mb={3}>Learn about the style that makes up Nulogy applications; including logo usage, typography, our colour system, iconography and spacing.</Text>
            <Button href="/style/colour">Learn how to design for Nulogy</Button>
        </Box>

        <Box boxShadow={1} mb={3} pl={3}>
            <SectionTitle mb={3}>Components</SectionTitle>
            <Text mb={3}>Built using React, components are tested interface design patterns designed to ensure a consistent experience for our users.</Text>
            <Button href="components">Use our components</Button>
        </Box>
    </Flex> 
  </Layout>
)

export default IndexPage
