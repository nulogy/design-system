import React from 'react'
import { Link } from 'gatsby'
import Intro from '../components/Intro'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <section>
        <h1>Nulogy Design System</h1>
        <Intro>The Nulogy Design System is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices.</Intro>
    </section>

    <div>
        <h2>Visual Style</h2>
        <p>Learn about the style that makes up Nulogy applications; including logo usage, typography, our colour system, iconography and spacing.</p>
        <a href="#">Learn how to design for Nulogy</a>
    </div>

    <div>
        <h2>Components</h2>
        <p>Built using React, components are tested interface design patterns designed to ensure a consistent experience for our users.</p>
        <a href="#">Use our components</a>
    </div> 
  </Layout>
)

export default IndexPage
