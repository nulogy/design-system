import React from 'react'
import {graphql} from "gatsby"
import {Helmet} from 'react-helmet'
import {Intro, Layout, DocSection} from '../components'
import {Title, Box} from '@nulogy/components'
import styled from 'styled-components'

const MarkdownStyles = styled.div`
  h1 {font-weight: 100 !important;}
  h1, h2, h3, h4 {font-weight: 500;}
  a, a:visited {color: tokens.color_base_blue; text-decoration: none;}
  a:hover {color: tokens.color_base_dark_blue;}
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
      <Layout>
        <MarkdownStyles>
          <Helmet>
              <title>{frontmatter.title} Nulogy Design System </title>
          </Helmet>
          <DocSection bg='whiteGrey' p={5} borderRadius={1}>
              <Title mb={0}>{frontmatter.title}</Title>
              <Intro>{frontmatter.intro} test</Intro>
          </DocSection>
          <Box maxWidth={800}>
          <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
          />
          </Box>
        </MarkdownStyles>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        intro
        path
        title
      }
    }
  }
`