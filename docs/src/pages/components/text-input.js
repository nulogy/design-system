import React from "react"
import {Helmet} from 'react-helmet'
import {Box, Flex, SectionTitle, SubsectionTitle, Title} from '@nulogy/components'
import {DocText as Text, Layout, Intro, DocSection, CheckList, Image} from '../../components'
import anatomy from '../../images/text-input/text-input-anatomy.png'
import basic from '../../images/text-input/text-input-basic.png'
import active from '../../images/text-input/text-input-state-active.png'
import default_placeholder from '../../images/text-input/text-input-state-default-placeholder.png'
import default_state from '../../images/text-input/text-input-state-default.png'
import disabled from '../../images/text-input/text-input-state-disabled.png'
import invalid from '../../images/text-input/text-input-state-invalid.png'
import invalid_active from '../../images/text-input/text-input-state-invalid-active.png'

export default () => (
    <Layout>
        <Helmet>
            <title>Text input</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title mb={0}>Text input</Title>   
            <Intro>An input field that users can type into.</Intro>
        </Box>
        <DocSection>
            <Image src={basic} width="75%" alt="Text input screenshot" />
            <SubsectionTitle>Use when</SubsectionTitle>
            <CheckList>Users need to enter information that is best communicated in text form.</CheckList>
            <CheckList>You need to collect information that varies from one user to another and can’t be represented as a set of pre-determined choices.</CheckList> 
        </DocSection>
        <DocSection>
            <SectionTitle>Anatomy</SectionTitle>
            <Image src={anatomy} width="75%" alt="Text input anatomy" />
        </DocSection>
        <DocSection>
            <SectionTitle>Variations</SectionTitle>
            <SubsectionTitle>Text Field</SubsectionTitle>
            <Text>Text field is used for single line text data.</Text>
            <SubsectionTitle>Text Area</SubsectionTitle>
            <Text>Text area is used when you anticipate the user to input more than one sentence.</Text>            
        </DocSection> 
        <DocSection>
            <SectionTitle>States</SectionTitle>
            <SubsectionTitle>Default</SubsectionTitle>
            <Flex>
                <Box>
                    <SubsectionTitle>Before input</SubsectionTitle>
                    <Image src={default_placeholder} alt="Text input screenshot" />
                </Box>
                <Box>
                    <SubsectionTitle>After input</SubsectionTitle>
                    <Image src={default_state} alt="Text input screenshot" />
                </Box>      
            </Flex>   
            <SubsectionTitle>Active</SubsectionTitle>       
            <Image src={active} width="50%" alt="Text input screenshot" />
            <SubsectionTitle>Invalid</SubsectionTitle>       
            <Image src={invalid} width="50%" alt="Text input screenshot" />
            <SubsectionTitle>Invalid and active</SubsectionTitle>       
            <Image src={invalid_active} width="50%" alt="Text input screenshot" />
            <SubsectionTitle>Disabled</SubsectionTitle>       
            <Image src={disabled} width="50%" alt="Text input screenshot" />   
            <SubsectionTitle>Size</SubsectionTitle>         
            <Text>Whenever possible match the width of the input field with the expected length of the input. If that is not possible then fill the entire width of the container.</Text>
        </DocSection>       

    </Layout>
)