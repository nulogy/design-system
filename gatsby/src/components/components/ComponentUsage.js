import React from 'react'
import {Box, Flex, SectionTitle} from '@nulogy/components'
import {Sketch as SketchLogo} from 'styled-icons/fa-brands/Sketch'
import {ReactLogo} from 'styled-icons/fa-brands/ReactLogo'
import {Github as GithubLogo} from 'styled-icons/fa-brands/Github'

const ComponentUsage = props => (  
  <Box mb={6}>
      <SectionTitle>Usage</SectionTitle>
      <Flex bg='whiteGrey' p={3}>
          <Box width={1/3}>
              <SketchLogo style={{marginRight: '8px', verticalAlign: 'middle'}} size="56" />
              <a href="/">NDS UI-Kit</a> 
          </Box>
          <Box width={1/3}>
              <ReactLogo style={{marginRight: '8px', verticalAlign: 'middle'}} size="56" />
              <a href={props.storybookLink}>View in Storybook</a>
          </Box>
          <Box width={1/3}>
              <GithubLogo style={{marginRight: '8px', verticalAlign: 'middle'}} size="56" />
              <a href={props.source}>See code on Github</a>
          </Box>                                  
      </Flex>
  </Box>  
)

export default ComponentUsage
