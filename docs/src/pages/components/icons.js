import React from "react"
import {Helmet} from 'react-helmet'
import { Icon, Box, Flex, Text, SectionTitle, Title, Link} from '@nulogy/components'
import {Layout, Intro, DocSection, CheckList, ComponentUsage} from '../../components'
import icons from '@nulogy/components/icons/icons.json'

const iconNames = Object.keys(icons);

const IconDisplay = (props) => {
    return(
        <Flex flexWrap='wrap' {...props}>
        {iconNames.map(icon => {
            return(
            <Flex key={icon} width={1/5}>
                <Icon name ={icon}/>
                <Text align='center' ml={2} >{icon}</Text>
            </Flex>    
            )
        })}
        </Flex>
    )
}

export default () => (
    <Layout>
        <Helmet>
            <title>Icons</title>
        </Helmet>
        <Box bg='whiteGrey' p={5} borderRadius={1} mb={6}>
            <Title m={0}>Icons</Title>   
            <Intro>Icons can be used alongside text to help assist users in finding certain actions on a page. </Intro>
        </Box>

        <DocSection>
            <SectionTitle>Avaliable Icons</SectionTitle>   
            <Text mb={5}>Nulogy uses a selection of solid style <Link href='https://material.io/tools/icons/?style=baseline'> Material Design</Link> icons. </Text>
            <IconDisplay mb={3}/>
            <Text>If your interface requires an icon not listed here, please post a message in the <Link href='slack://channel?id=CBAFQ4X7X/'>#design-system</Link> slack channel.</Text>
        </DocSection>               

        <DocSection>
            <SectionTitle>Content guidelines</SectionTitle>
                <CheckList>Avoid using icons without labels unless the meaning is ubiquitous, like print</CheckList>
                <CheckList><i>For more information on icon usability and recognition, see this study from Nielsen Norman Group: <Link href='https://www.nngroup.com/articles/icon-usability/'>Icon Usability.</Link></i></CheckList>
        </DocSection>

        <ComponentUsage storybookLink='http://localhost:8080/?selectedKind=Icon' source='/components/src/icon/icon.js'></ComponentUsage>
    </Layout>
)