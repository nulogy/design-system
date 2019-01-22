import React from "react"
import {Helmet} from 'react-helmet'
import {Box, Text, SectionTitle, SubsectionTitle, Link, Title} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, Image} from '../../components'
import anatomy from '../../images/form/anatomy.png'
import basic from '../../images/form/basic.png'
import header_error from '../../images/form/header-error.png'
import help_text_anatomy from '../../images/form/help-text-anatomy.png'
import optional_required_anatomy from '../../images/form/optional-required-anatomy.png'

export default () => (
    <Layout>
        <Helmet>
            <title>Form</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title mb={0}>Form</Title>   
            <Intro>Forms are a collection of inputs that allow users to submit data.</Intro>
        </Box>
        <DocSection>
            <Image src={basic} width="75%" alt="Example of a form" />
        </DocSection>
        <DocSection>
            <SectionTitle>Anatomy</SectionTitle>
            <Image src={anatomy} alt="Visual anatomy of a form" />
            <SubsectionTitle>(A) Form Title</SubsectionTitle>
            <Text>Can be any Heading component depending on the form’s placement in a page.</Text>
            <SubsectionTitle>(B) Header level validation</SubsectionTitle>
            <Text>See <em>Handling Errors</em> below</Text>  
            <SubsectionTitle>(C) Fieldset (optional)</SubsectionTitle>          
            <Text>Fieldset is a grouping of related fields.</Text>
            <SubsectionTitle>(D) Actions</SubsectionTitle>
            <Text>Actions allow users to submit a form. The submit button is always a PrimaryButton, displayed at the bottom, to the left of any secondary actions.</Text>
            <SubsectionTitle>(E) Fieldset title / Legend (optional)</SubsectionTitle>
            <Text>Can be any Heading component depending on the form’s placement in a page.</Text>
            <SubsectionTitle>(F) Labels</SubsectionTitle>
            <Text>Labels inform users what the corresponding input field means. A label is always left-aligned and placed above the input field.</Text>
            <SubsectionTitle>(G) Help Text (optional)</SubsectionTitle>
            <Text>Help text is placed below the label to provide assistance on how to fill out a field or the expected format. It can also provide an explanation of why the information is needed and how it will be used.</Text>
            <Image src={help_text_anatomy} alt="Visual anatomy of help text" />
            <SubsectionTitle>(H) Input fields</SubsectionTitle>
            <Text>Input fields enable users to provide information. Information can be entered through a variety of different inputs.</Text>
            <Box ml={2}>
                <Text><Link href='/components/text-input'>Text</Link> input for single or multi-line text data</Text>
                <Text><Link href='/components/radio-button'>Radio</Link> button to select one option out of a small list (~ 5-7 max)</Text>
                <Text><Link href='/components/select'>Select</Link> to select one option out of a large list</Text>
                <Text><Link href='/components/checkbox'>Checkbox</Link> to select one or multiple options from a list</Text>
                <Text><Link href='/components/toggle'>Toggle</Link> for boolean choices</Text>
            </Box>
            <SubsectionTitle>(I) Optional vs required label</SubsectionTitle>
            <Text>If a field is optional or required, it should be visually apparent before submission. Use only one of these labels at a time. When making a form, decide which is more common and apply the label to the smaller of the two groups.</Text>    
            <Image src={optional_required_anatomy} alt="Visual anatomy of optional vs required labels" />
            <SubsectionTitle>(J) Placeholder text (optional)</SubsectionTitle>
            <Text>Placeholder text can be used to describe a field’s expected format.</Text>
            <SubsectionTitle>(K) Inline validation</SubsectionTitle>
            <Text>See <em>Handling Errors</em> below</Text>
        </DocSection>    
        <DocSection>
            <CheckList>Always order items in a logical order that doesn’t require scrolling around</CheckList>
            <CheckList>Whenever possible group items together into fieldsets</CheckList>
            <CheckList>Lay out the form in a single column</CheckList>
            <CheckList>Place actions on the bottom of the form</CheckList>
            <CheckList>Use a label with every input</CheckList>
            <CheckList>Placeholders are not replacements for labels, as they are not treated as labels by assistive technology and they disappear when a user tries interacting with a field.</CheckList>
        </DocSection>
        <DocSection>
            <Title>Handling Errors</Title>
            <Text>There are three important messages that a good form error message should convey to the user:</Text>
            <CheckList>An error has occurred</CheckList>
            <CheckList>Where the error occurred</CheckList>
            <CheckList>How to recover from an error</CheckList>
            <Text mt={2}>There are two types of validation: Header level validation and Inline validation</Text>
        </DocSection>
        <DocSection>
            <SectionTitle>Header validation</SectionTitle>
            <Image src={header_error} alt="Header validation screenshot" />
            <Text>Header validation is triggered after submitting a form with validation errors. The message displays at the top of the form and is present until the validation is passed.</Text>
        </DocSection>
        <DocSection>            
            <SectionTitle>Inline validation</SectionTitle>
            <Text>Inline validation is triggered when the user focuses out of a form field with invalid data. The inline error message is displayed right below the form field. The error message can consist of a single line of text, list, a or a combination of two. The error message stays displayed until the valid value has been entered and the user focuses out of the form field.</Text>
        </DocSection>
        <DocSection>            
            <SectionTitle>Content guidelines</SectionTitle>
            <Text>The best error is one that doesn’t exist so try to prevent errors when possible by grouping related fields, writing effective help text and clearly communicating input expectations.</Text>
            <Text>When writing error text, do not blame the user. e.g “That number is incorrect” vs “You’ve entered an incorrect number”</Text>
            <Text>Avoid vague, generalized or cryptic error messages</Text>
        </DocSection>
    </Layout>
)