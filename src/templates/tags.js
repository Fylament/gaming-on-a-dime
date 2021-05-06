import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Trending from '../components/Trending'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
      <div className="" key={post.node.fields.slug}>
      <article
        className={`blog-list-item tile is-child text-primary text-base mb-4 md:border-b text-content block md:border-secondary md:p-5 mb-10 md:mb-0 sm:pb-5  ${
          post.node.frontmatter.featuredpost ? 'is-featured' : ''
        }`}
      >
        <header className="grid md:grid-cols-1 lg:grid-cols-2 md:mb-4">
          {post.node.frontmatter.featuredimage ? (
            <div className="featured-thumbnail md:col-span-1 md:mr-5 ">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.node.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                }}
              />
            </div>
          ) : null}
          <p className="post-meta md:col-span-1 pl-5 pt-2 md:p-0">
            <Link
              className="title font-oswald text-primary no-underline text-xl md:col-span-1"
              to={post.node.fields.slug}
            >
              {post.node.frontmatter.title}
            </Link>
            <div className="md:col-span-1 text-xs text-content font-open font-medium">
              {post.node.frontmatter.date}
            </div>
            <div className="md:col-span-1 text-content">
              <p className="mt-4 text-sm font-open">
                {post.node.frontmatter.description}
              </p>
            </div>
          </p>
        </header>
      </article>
      </div>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container mx-auto md:px-20 ">
            <div className="content grid grid-cols-12 ">
              <div
                className="lg:col-span-8 col-span-12"
              >
                <h3 className="title text-semibold text-content font-oswald mb-5 md:mb-0 section-label pl-5 mt-4 block ">{tagHeader}</h3>
                {postLinks}
                <p className="text-content font-open mt-4 pl-5 md:pl-0 text-sm">
                  <Link to="/tags/">Browse all tags    ᐅ</Link>
                </p>
              </div>
              <div className="lg:col-span-4 col-span-12">
                <Trending />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM D, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
