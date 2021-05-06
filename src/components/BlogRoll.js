import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="grid grid-cols-1">
        <div className="col-span-1">
        <span className= "section-label pl-5 lg:mt-0 mt-4 italic text-content mb-4 md:mb-2 lg:mb-0 block font-medium font-oswald">Latest Posts</span>
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
        </div>
        
      </div>
      // // <div className="columns">
      //   <div className="columns is-9">
      //     hello friends

      //   </div>
      //   <div className="columns is-multiline is-3">
      //     {posts &&
      //       posts.map(({ node: post }) => (
      //         <div className="columns is-parent is-3" key={post.id}>
      //           <article
      //             className={`blog-list-item tile is-child box notification ${
      //               post.frontmatter.featuredpost ? 'is-featured' : ''
      //             }`}
      //           >
      //             <header>
      //               {post.frontmatter.featuredimage ? (
      //                 <div className="featured-thumbnail">
      //                   <PreviewCompatibleImage
      //                     imageInfo={{
      //                       image: post.frontmatter.featuredimage,
      //                       alt: `featured image thumbnail for post ${post.frontmatter.title}`,
      //                     }}
      //                   />
      //                 </div>
      //               ) : null}
      //               <p className="post-meta">
      //                 <Link
      //                   className="title has-text-primary is-size-4"
      //                   to={post.fields.slug}
      //                 >
      //                   {post.frontmatter.title}
      //                 </Link>
      //                 <span> &bull; </span>
      //                 <span className="subtitle is-size-5 is-block">
      //                   {post.frontmatter.date}
      //                 </span>
      //               </p>
      //             </header>
      //             <p>
      //               {post.excerpt}
      //               <br />
      //               <br />
      //               <Link className="button" to={post.fields.slug}>
      //                 Keep Reading →
      //               </Link>
      //             </p>
      //           </article>
      //         </div>
      //       ))}
      //   </div>
        
      // </div>
      )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { in: ["blog-post", "guides-post", "review-post", "news-post"] } } }
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
