module.exports = {
  siteMetadata: {
    title: "Nulogy Design System",
    description: "Documentation for the Nulogy Design System",
    author: "Nulogy",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/markdown/`,
        name: "markdown-pages",
      },
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
              maxWidth: 990,
            },
          },
        ],
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/nulogy.svg", // This path is relative to the root of the site.
      },
    },
    {
        resolve: "gatsby-plugin-prefetch-google-fonts",
        options: {
          fonts: [
            {
              family: "IBM Plex Sans",
              variants: ["300", "400", "500", "600"],
            },
            {
              family: "IBM Plex Mono",
            },
          ],
        },
    }
  ],
};
