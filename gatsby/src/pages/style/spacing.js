import React from 'react'
import {Box, Text, Title, SectionTitle} from '@nulogy/components'
import {Layout, Intro, DocSection} from '../../components'
import anatomy from '../../images/spacing-anatomy.png'
import scale from '../../images/spacing-scale.svg'

export default () => (
    <Layout>
        <DocSection bg='whiteGrey' p={5} borderRadius={1}>
            <Title>Spacing</Title>   
            <Intro>A spacing scale is used to maintain consistent paddings between and within elements throughout our products. Sticking to a scale allows us to be more consistent and predictable, and makes our designs more harmonious.</Intro>
        </DocSection>

        <DocSection>
            <Text>Nulogy uses a scale based on 8px with modifiers from half (4px) to 8x (64px).</Text>
            <img src={anatomy} alt="Spacing example" style={{width: '50%'}} />
        </DocSection>

        <DocSection>
            <img src={scale} alt="Spacing example" />
        </DocSection>

        <DocSection>
            <SectionTitle>How to choose spacing</SectionTitle>
            <Text>There are two important factors to consider when choosing spacing: size and relatedness</Text>
            <Box mb={2}>
            <Text mb={0}>Use less spacing inside smaller elements or between functionally related elements.</Text>
            <Text>Use more spacing inside larger elements or between less functionally related elements</Text>
            </Box>
            <Text>Note: half should mostly be used for spacing related items within an element, e.g a button’s text and it’s icon.</Text>
        </DocSection>

        <DocSection>
            <SectionTitle>Usage</SectionTitle>
            <ul>
                <li><a href="/">Tokens</a></li>
                <li><a href="/">CSS classes</a></li>
                <li><a href="/">React storybook</a></li>
            </ul>
        </DocSection>
    </Layout>
)
