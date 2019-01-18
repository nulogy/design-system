import React from "react"
import {Helmet} from 'react-helmet'
import {Box, SectionTitle, SubsectionTitle, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, Image} from '../../components'
import anatomy from '../../images/select/select-anatomy.png'
import basic from '../../images/select/select-basic.png'
import default_state from '../../images/select/select-state-default.png'
import selected from '../../images/select/select-state-selected.png'
import disabled from '../../images/select/select-disabled.png'

export default () => (
    <Layout>
        <Helmet>
            <title>Select</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title m={0}>Select</Title>   
            <Intro>For making one selection from a large list of options.</Intro>
        </Box>
        <DocSection>
            <Image src={basic} width="75%" alt="Text input screenshot" />
            <SubsectionTitle>Use when</SubsectionTitle>
            <CheckList>Users need to choose a single option from a list of mutually exclusive options.</CheckList>
            <CheckList>There is a large data set that would be impractical for radio buttons or a toggle.</CheckList> 
        </DocSection>
        <DocSection>
            <SectionTitle>Anatomy</SectionTitle>
            <Image src={anatomy} width="50%" alt="Text input screenshot" />
        </DocSection>
        <DocSection>
            <SectionTitle>States</SectionTitle>
            <SubsectionTitle>Default</SubsectionTitle>
            <Image src={default_state} width="50%" alt="Text input screenshot" />
            <SubsectionTitle>With input</SubsectionTitle>
            <Image src={selected} width="50%" alt="Text input screenshot" />  
            <SubsectionTitle>Disabled</SubsectionTitle>
            <Image src={disabled} width="50%" alt="Text input screenshot" />                       
        </DocSection>        
    </Layout>
)