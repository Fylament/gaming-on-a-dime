import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Pager from '../components/Pager'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import FeaturedBlog from '../components/featured/FeaturedBlog'
import Trending from '../components/Trending'

const Blog = ({data, pageContext}) => {
  const { edges: posts } = data.allMarkdownRemark
    return(
      <Layout>
      <FeaturedBlog/>
      <section className="section section--gradient">
        <div className="container mx-auto lg:px-20 md:px-20 ">
          <div className="section">
            <div className="content grid grid-cols-12 ">
              <div className="lg:col-span-8 col-span-12">
              <span className= "section-label pl-5 lg:mt-0 mt-4 italic text-content mb-4 md:mb-2 lg:mb-0 block font-medium font-oswald">Blog</span>
                    {posts &&
                    posts.map(({ node: post }) => (
                      <div className="" key={post.id}>
                      <article
                        className={`blog-list-item tile is-child text-primary text-base mb-4 md:border-b text-content block md:border-secondary md:p-5 mb-10 md:mb-0 sm:pb-5  ${
                          post.frontmatter.featuredpost ? 'is-featured' : ''
                        }`}
                      >
                        <header className="grid md:grid-cols-1 lg:grid-cols-2 md:mb-4 ">
                          {post.frontmatter.featuredimage ? (
                            <div className="featured-thumbnail md:col-span-1 md:mr-5 ">
                              <PreviewCompatibleImage
                                imageInfo={{
                                  image: post.frontmatter.featuredimage,
                                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                }}
                              />
                            </div>
                          ) : null}
                          <p className="post-meta md:col-span-1 pl-5 pt-2 md:p-0">
                            <Link
                              className="title font-oswald text-primary no-underline text-xl md:col-span-1"
                              to={post.fields.slug}
                            >
                              {post.frontmatter.title}
                            </Link>
                            <div className="md:col-span-1 text-xs text-content font-open font-medium">
                              {post.frontmatter.date}
                            </div>
                            <div className="md:col-span-1 text-content">
                              <p className="mt-4 text-sm font-open">
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
              <div className="lg:col-span-4 col-span-12">
                <Trending />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    )
};


Blog.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired
}


export const query = graphql`
  query ($skip : Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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

export default Blog