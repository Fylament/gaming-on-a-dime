const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      articles:
      allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
                templateKey
              }
            }
          }
      }
      posts:
      allMarkdownRemark(limit: 1000
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
      news:
      allMarkdownRemark(limit: 1000
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
      guides:
      allMarkdownRemark(limit: 1000
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
      reviews:
      allMarkdownRemark(limit: 1000
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    
    const articles  = result.data.articles.edges
    const posts = result.data.posts.edges
    const news = result.data.news.edges
    const guides = result.data.guides.edges
    const reviews = result.data.reviews.edges

    paginate({
      createPage,
      items: news,
      itemsPerPage: 10,
      pathPrefix: '/news',
      component: path.resolve('src/templates/news.js')
    });

    paginate({
      createPage,
      items: posts,
      itemsPerPage: 10,
      pathPrefix: '/blog-posts',
      component: path.resolve('src/templates/blog.js')
    });

    paginate({
      createPage,
      items: reviews,
      itemsPerPage: 10,
      pathPrefix: '/reviews',
      component: path.resolve('src/templates/reviews.js')
    });

    paginate({
      createPage,
      items: guides,
      itemsPerPage: 10,
      pathPrefix: '/guides',
      component: path.resolve('src/templates/guides.js')
    });
    
    articles.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
    
    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    articles.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
