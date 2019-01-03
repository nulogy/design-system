import React from "react"
import { graphql } from "gatsby"
import Intro from '../components/Intro'
import Layout from '../components/layout'
import {Title} from '@nulogy/components'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
      <Layout>
        <div>
        <div>
            <Title>{frontmatter.title}</Title>
            <Intro>{frontmatter.intro}</Intro>
            <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
        </div>
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