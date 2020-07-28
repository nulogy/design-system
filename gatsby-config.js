module.exports = {
  siteMetadata: {
    title: "Nulogy Design System",
    description: "Documentation for the Nulogy Design System",
    author: "Nulogy"
  },
  plugins: [
    "gatsby-plugin-remove-serviceworker",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/markdown/`,
        name: "markdown-pages"
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 990
            }
          }
        ]
      }
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Nulogy.design",
        short_name: "NDS",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: `${__dirname}/src/images/favicon.svg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "UA-5984624-20"
      }
    },
    "gatsby-plugin-netlify" // THE DOCS SAY THIS HAS TO BE LAST IN THIS ARRAY: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify
  ]
};
