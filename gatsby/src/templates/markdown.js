import React from "react"
import { graphql } from "gatsby"
import {Helmet} from 'react-helmet'
import {Layout, DocSection} from '../components'
import {Title} from '@nulogy/components'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
      <Layout>
        <Helmet>
            <title>{frontmatter.title} </title>
        </Helmet>
        <DocSection bg='whiteGrey' p={5} borderRadius={1}>
            <Title mb={0}>{frontmatter.title}</Title>
          </DocSection>
          <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
          />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`