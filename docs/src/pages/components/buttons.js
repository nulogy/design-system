import React from "react"
import {Helmet} from 'react-helmet'
import {Button, DangerButton, PrimaryButton, QuietButton, IconicButton, Box, Flex, Text, SectionTitle, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, ComponentUsage} from '../../components'

export default () => (
    <Layout>
        <Helmet>
            <title>Buttons</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title m={0}>Buttons</Title>
            <Intro>Buttons make common actions immediately detectable and easy to perform.</Intro>
        </Box>

        <DocSection>
            <Flex mb={4}>
                <Flex width={2/5}  justifyContent='center' alignItems='center' mr={3} >
                    <Button>Button</Button>
                </Flex>
                <Box width={3/5}>
                    <Text mb={0}>Buttons are used for actions that do not require any special emphasis and cover most cases.</Text>
                </Box>
            </Flex>
            <Flex mb={4}>
                <Flex width={2/5}  justifyContent='center' alignItems='center' mr={3} >
                    <PrimaryButton>Primary button</PrimaryButton>
                </Flex>
                <Box width={3/5}>
                    <Text mb={0}>Primary Buttons are used for the main action in a particular context. There is usually not more than one primary button per screen and not all of the screens require a Primary button.</Text>
                </Box>
            </Flex>
            <Flex mb={4}>
                <Flex width={2/5} justifyContent='center' alignItems='center' mr={3}>
                    <DangerButton>Danger button</DangerButton>
                </Flex>
                <Box width={3/5}>
                    <Text mb={0}>Danger Buttons are used for destructive actions such as deleting. They are most likely to appear in confirmation dialogs.</Text>
                </Box>
            </Flex>
            <Flex mb={4}justifyContent='center' alignItems='center'>
                <Flex width={2/5} justifyContent='center' mr={3}>
                    <QuietButton>Quiet button</QuietButton>
                </Flex>
                <Box width={3/5}>
                    <Text mb={0}>Quiet Buttons are used for less important actions such as “Cancel” or actions that are not directly related to the context of the page (e.g Learn more …). Quiet buttons are often paired with a Primary button.</Text>
                </Box>
            </Flex>
            <Flex mb={4}>
              <Flex width={2/5} justifyContent='center' alignItems='center' flexDirection='column' mr={3} >
                <IconicButton mb={5} icon='delete' labelVisibility='hover'>Iconic button</IconicButton>
                <IconicButton icon='delete' labelVisibility='always'>Iconic button</IconicButton>
              </Flex>
              <Box width={3/5}>
                <Text mb={0}>Iconic Buttons are used for universally understood actions that can effectively be represented using icon. There are 2 variations of Iconic buttons: with permanently exposed label and with label exposed on hover.</Text>
              </Box>
            </Flex>
        </DocSection>

        <DocSection>
            <SectionTitle>Sizes</SectionTitle>
            <Text>All buttons are available in three sizes and a full-width option.</Text>
            <Button size="small" mr={4} mb={3}>Small button</Button>
            <Button size="medium" mr={4} mb={3}>Medium button</Button>
            <Button size="large" mb={3}>Large button</Button>
            <Button fullWidth>Full width button</Button>
        </DocSection>

        <DocSection>
            <SectionTitle>States</SectionTitle>
            <Text>All buttons can be disabled. When a button is disabled, it's greyed out and unable to be clicked.</Text>
            <Button mr={4} mb={3} disabled>Create project</Button>
            <PrimaryButton mr={4} mb={3} disabled>Create project</PrimaryButton>
            <DangerButton mr={4} mb={3} disabled>Delete project</DangerButton>
            <QuietButton disabled mr={4} mb={3}>Edit project</QuietButton>
            <IconicButton icon='delete' labelVisibility='always' disabled mr={4} mb={3}>Iconic Button</IconicButton>
        </DocSection>

        <DocSection>
            <SectionTitle>Content guidelines</SectionTitle>
                <CheckList>Always lead with an actionable verb</CheckList>
                <CheckList>Whenever possible follow with a clear noun <em>(e.g: Create shipment, Approve delivery.)</em></CheckList>
                <CheckList>Always use sentence case</CheckList>
        </DocSection>

        <ComponentUsage storybookLink='http://localhost:8080/?selectedKind=Button' source='/components/buttons/buttons.js'></ComponentUsage>
    </Layout>
)
