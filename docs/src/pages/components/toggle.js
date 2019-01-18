import React from "react"
import {Helmet} from 'react-helmet'
import {Box, Flex, Text, SectionTitle, SubsectionTitle, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, Image} from '../../components'
import anatomy from '../../images/toggle/anatomy.png'
import on from '../../images/toggle/on.png'
import off from '../../images/toggle/off.png'
import on_disabled from '../../images/toggle/on-disabled.png'
import off_disabled from '../../images/toggle/off-disabled.png'

export default () => (
    <Layout>
        <Helmet>
            <title>Toggle</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title m={0}>Toggle</Title>   
            <Intro>For quickly switching between two possible states.</Intro>
        </Box>
        <DocSection>
            <Image src={on} width="75%" alt="Toggle screenshot" />
        </DocSection>
        <DocSection>
            <SectionTitle>Anatomy</SectionTitle>
            <Image src={anatomy} alt="Toggle screenshot" />
        </DocSection>
        <DocSection>
            <SectionTitle>Guidelines</SectionTitle>
            <Text>Always use the toggle value label to clearly communicate the selected state.</Text>
        </DocSection>
        <DocSection>
            <SectionTitle>States</SectionTitle>
            <SubsectionTitle>Default</SubsectionTitle>
            <Flex mb={2}>
                <Box><Image src={on} alt="Toggle screenshot" /></Box>
                <Box><Image src={off} alt="Toggle screenshot" /></Box>
            </Flex>
            <SubsectionTitle>Disabled</SubsectionTitle>
            <Flex>
                <Box><Image src={on_disabled} alt="Toggle screenshot" /></Box>
                <Box><Image src={off_disabled} alt="Toggle screenshot" /></Box>
            </Flex>            
        </DocSection>                 
    </Layout>
)