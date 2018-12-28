import React from "react"
import { Flex } from '../../../../components/src/Flex'
import { Box } from '../../../../components/src/Box'
import Text from '../../../../components/src/Type/Text';

import Layout from '../../components/layout'
import Intro from '../../components/Intro'
import {Title, SectionTitle} from '@nulogy/components';

import * as tokens from '../../../../tokens/build/exports.js'

const Palette = props => (
    <Box width={1/3} mb={"24px"}>
        <Box pt={"48px"} pb={"46px"} mb={"16px"} bg={props.colour}></Box>
        <p>#{props.name}</p>
        <p>{props.colour}</p>
    </Box>
)

export default () => (
    <Layout>
        <h1 className="Title">Colour</h1>   
        <Intro>Colours are used to set a visual tone, communicate meaning, and create a cohesive experience between Nulogy products and the physical environment. We are committed to complying with WCAG AA contrast ratios.</Intro>
       
        <Box mb={"48px"}>
            <h2 className="SectionTitle">Text & Interactive Colours</h2>
            <Palette name="Black" colour={tokens.color_base_black}></Palette>
            <Palette name="Black Blue" colour={tokens.color_base_black_blue}></Palette>
            <Palette name="Dark Blue" colour={tokens.color_base_dark_blue}></Palette>
            <Palette name="Blue" colour={tokens.color_base_blue}></Palette>
            <Palette name="Light Blue" colour={tokens.color_base_light_blue}></Palette>
        </Box>

        <Box mb={"48px"}>
            <h2 className="SectionTitle">UI & Background Colours</h2>
            <Palette name="Dark Grey" colour={tokens.color_base_dark_grey}></Palette>
            <Palette name="Grey" colour={tokens.color_base_grey}></Palette>
            <Palette name="Light Grey" colour={tokens.color_base_light_grey}></Palette>
            <Palette name="White Grey" colour={tokens.color_base_white_grey}></Palette>
            <Palette name="White" colour={tokens.color_base_white}></Palette>
        </Box>
        <Box mb={"48px"}>
            <h2 className="SectionTitle">Contextual Colours</h2>
            <Palette name="Green" colour={tokens.color_base_green}></Palette>
            <Palette name="Red" colour={tokens.color_base_red}></Palette>
            <Palette name="Yellow" colour={tokens.color_base_yellow}></Palette>
        </Box>
    </Layout>
)
