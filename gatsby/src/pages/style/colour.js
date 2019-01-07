import React from 'react'
import {Box, Flex, Text, Title, SectionTitle} from '@nulogy/components'
import {Layout, Intro, DocSection} from '../../components'
import * as tokens from '@nulogy/tokens'

const Palette = props => (
    <Box width={1/3} mb={3}>
        <Box mr={2} pt={6} pb={6} mb={1} bg={props.colour} borderRadius={1}></Box>
        <Text mb={0}>{props.name}</Text>
        <Text fontSize={0}>{props.colour}</Text>
    </Box>
)

export default () => (
    <Layout>
        <DocSection bg='whiteGrey' p={5} borderRadius={1}>
            <Title>Colour</Title>   
            <Intro>Colours are used to set a visual tone, communicate meaning, and create a cohesive experience between Nulogy products and the physical environment. We are committed to complying with <a href="https://webaim.org/resources/contrastchecker/">WCAG AA</a> contrast ratios.</Intro>
        </DocSection>
        
        <DocSection mb={3}>
            <SectionTitle>Text & Interactive Colours</SectionTitle>
            <Flex>
                <Palette name="Black" colour={tokens.color_base_black}></Palette>
                <Palette name="Black Blue" colour={tokens.color_base_black_blue}></Palette>
                <Palette name="Dark Blue" colour={tokens.color_base_dark_blue}></Palette>
                <Palette name="Blue" colour={tokens.color_base_blue}></Palette>
                <Palette name="Light Blue" colour={tokens.color_base_light_blue}></Palette>
            </Flex>
        </DocSection>

        <DocSection mb={3}>
            <SectionTitle>UI & Background Colours</SectionTitle>
            <Flex>
                <Palette name="Dark Grey" colour={tokens.color_base_dark_grey}></Palette>
                <Palette name="Grey" colour={tokens.color_base_grey}></Palette>
                <Palette name="Light Grey" colour={tokens.color_base_light_grey}></Palette>
                <Palette name="White Grey" colour={tokens.color_base_white_grey}></Palette>
                <Palette name="White" colour={tokens.color_base_white}></Palette>
            </Flex>
        </DocSection>

        <DocSection mb={3}>
            <SectionTitle>Contextual Colours</SectionTitle>
            <Flex>
                <Palette name="Green" colour={tokens.color_base_green}></Palette>
                <Palette name="Red" colour={tokens.color_base_red}></Palette>
                <Palette name="Yellow" colour={tokens.color_base_yellow}></Palette>
            </Flex>
        </DocSection>
    </Layout>
)
