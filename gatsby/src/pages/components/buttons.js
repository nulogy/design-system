import React from "react"
import {Button, DangerButton, PrimaryButton, QuietButton, Box, Flex, Text, SectionTitle, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, ComponentUsage} from '../../components'

export default () => (
    <Layout>
    
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title mb={0}>Buttons</Title>   
            <Intro>Buttons make common actions immediately detectable and easy to perform.</Intro>
        </Box>

        <DocSection>
            <Flex mb={6}>
                <Box width={1/4}>
                    <Button>Button</Button>
                </Box>
                <Box width={3/4}>
                    <Text>Buttons are used for actions that do not require any special emphasis and cover most cases.</Text>
                </Box>
            </Flex>
            <Flex mb={6}>
                <Box width={1/4}>
                    <PrimaryButton>Primary Button</PrimaryButton>
                </Box>
                <Box width={3/4}>
                    <Text>Primary Buttons are used for the main action in a particular context. There is usually not more than one primary button per screen and not all of the screens require a Primary button.</Text>
                </Box>
            </Flex>        
            <Flex mb={6}>              
                <Box width={1/4}>
                    <DangerButton>Danger Button</DangerButton>
                </Box>
                <Box width={3/4}>
                    <Text>Danger Buttons are used for destructive actions such as deleting. They are most likely to appear in confirmation dialogs.</Text>
                </Box>
            </Flex>   
            <Flex>              
                <Box width={1/4}>
                    <QuietButton>Quiet Button</QuietButton>
                </Box>
                <Box width={3/4}>
                    <Text>Quiet Buttons are used for less important actions such as “Cancel” or actions that are not directly related to the context of the page (e.g Learn more …). Quiet buttons are often paired with a Primary button.</Text>
                </Box>
            </Flex>            
        </DocSection>               
        
        <DocSection>
            <SectionTitle>Sizes</SectionTitle>
            <Text>All buttons are available in three sizes and a full-width option.</Text>
            <Button size="small" mr={3} mb={2}>Small</Button>
            <Button size="medium" mr={3} mb={2}>Medium</Button>
            <Button size="large" mb={2}>Large</Button>
            <Button fullWidth>Large</Button>
        </DocSection>

        <DocSection>
            <SectionTitle>States</SectionTitle>
            <Text>All buttons can be disabled. When a button is disabled, it's greyed out and unable to be clicked.</Text>
            <Button mr={3} disabled>Create project</Button>
            <PrimaryButton mr={3} disabled>Create project</PrimaryButton>
            <DangerButton mr={3} disabled>Delete project</DangerButton>
            <QuietButton disabled>Edit project</QuietButton>
        </DocSection>

        <DocSection>
            <SectionTitle>Content guidelines</SectionTitle>
                <CheckList>Always lead with an actionable verb</CheckList>
                <CheckList>Whenever possible follow with a clear noun Example: Create shipment, Approve delivery.</CheckList>
                <CheckList>Always use sentence case</CheckList>
        </DocSection>

        <ComponentUsage storybookLink='http://localhost:8080/?selectedKind=Button' source='/components/buttons/buttons.js'></ComponentUsage>
    </Layout>
)