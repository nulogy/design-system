import React from "react"
import {Helmet} from 'react-helmet'
import {Box, Link, SectionTitle, SubsectionTitle, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, Image} from '../../components'
import anatomy from '../../images/radio-button/radio-button-anatomy.png'
import basic from '../../images/radio-button/radio-button-basic.png'
import selected from '../../images/radio-button/radio-button-selected.png'
import unselected from '../../images/radio-button/radio-button-unselected.png'
import disabled from '../../images/radio-button/radio-button-disabled.png'


export default () => (
    <Layout>
        <Helmet>
            <title>Radio button</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title mb={0}>Radio button</Title>   
            <Intro>Radio buttons allow one selection from a group of options</Intro>
        </Box>
        <DocSection>
            <Image src={basic} width="75%" alt="Text input screenshot" />
            <SubsectionTitle>Use when</SubsectionTitle>
            <CheckList>Users need to make a single choice from a set of mutually exclusive options</CheckList>
            <CheckList>In place of a dropdown when it would be beneficial to see all items up front</CheckList> 
        </DocSection>
        <DocSection>
            <SectionTitle>Anatomy</SectionTitle>
            <Image src={anatomy} alt="Radio button anatomy" />
        </DocSection>
        <DocSection>
            <SectionTitle>Guidelines</SectionTitle>
            <CheckList>Whenever possible use radio buttons for short lists (~ 5-7)</CheckList>
            <CheckList>Consider using a <Link href='/components/select'>Select</Link> for long lists</CheckList>
            <CheckList>Users should be able to select the radio button by clicking on the box directly or by clicking on its label.</CheckList>
        </DocSection>
        <DocSection>
            <SectionTitle>States</SectionTitle>
            <SubsectionTitle>Default</SubsectionTitle>
            <Image src={unselected} width="50%" alt="Text input screenshot" />
            <SubsectionTitle>Selected</SubsectionTitle>
            <Image src={selected} width="50%" alt="Text input screenshot" />  
            <SubsectionTitle>Disabled</SubsectionTitle>
            <Image src={disabled} width="50%" alt="Text input screenshot" />                       
        </DocSection>        
    </Layout>
)