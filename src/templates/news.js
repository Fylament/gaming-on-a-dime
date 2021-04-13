import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Pager from '../components/Pager'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import FeaturedNews from '../components/featured/FeaturedNews'
import Trending from '../components/Trending'

const News = ({data, pageContext}) => {
  const { edges: posts } = data.allMarkdownRemark
    return(
      <Layout>
      <FeaturedNews/>
      
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12 ">
                <div className="content columns">
                  <div className="column is-8">
                        {posts &&
                        posts.map(({ node: post }) => (
                          <div className="" key={post.id}>
                          <article
                            className={`blog-list-item tile is-child box-post  ${
                              post.frontmatter.featuredpost ? 'is-featured' : ''
                            }`}
                          >
                            <header>
                              {post.frontmatter.featuredimage ? (
                                <div className="featured-thumbnail">
                                  <PreviewCompatibleImage
                                    imageInfo={{
                                      image: post.frontmatter.featuredimage,
                                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                    }}
                                  />
                                </div>
                              ) : null}
                              <p className="post-meta">
                                <Link
                                  className="title post-title has-text-primary is-size-5"
                                  to={post.fields.slug}
                                >
                                  {post.frontmatter.title}
                                </Link>
                                <div className="post-date">
                                  {post.frontmatter.date}
                                </div>
                                <div className="post-description">
                                  <p>
                                    {post.frontmatter.description}
                                  </p>
                                </div>
                              </p>
                              
                            </header>
                          </article>
                          </div>
                        ))}
                        <Pager pageContext={pageContext}/>
                  </div>
                  <div className="column is-3">
                    <Trending />
                  </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      </Layout>
    )
};


News.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired
}


export const query = graphql`
  query ($skip : Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
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
`;

export default News