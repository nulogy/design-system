import React from 'react'
import {Box, Flex, Link, Text, Title, SectionTitle} from '@nulogy/components'
import {Intro, Layout} from '../components/'

const IndexPage = () => (
  <Layout>
    <Box bg='whiteGrey' p={6} borderRadius={1} mb={7}>
        <Title mb={3}>Nulogy Design System</Title>
        <Intro>The Nulogy Design System is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices.</Intro>
    </Box>

    <Flex>
        <Box width={'50%'} boxShadow={0} mb={4} pr={4}>
            <SectionTitle mb={4}>Visual Style</SectionTitle>
            <Text mb={4}>Learn about the style that makes up Nulogy applications; including logo usage, typography, our colour system, iconography and spacing.</Text>
            <Link href="/style/colour">Learn how to design for Nulogy</Link>
        </Box>

        <Box width={'50%'} boxShadow={1} mb={4} pl={4}>
            <SectionTitle mb={4}>Components</SectionTitle>
            <Text mb={4}>Built using React, components are tested interface design patterns designed to ensure a consistent experience for our users.</Text>
            <Link href="components">Use our components</Link>
        </Box>
    </Flex> 
  </Layout>
)

export default IndexPage
