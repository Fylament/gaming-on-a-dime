import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class Trending extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
        <div className="sidebar-container is-multiline">
        <span className="section-label">Trending</span>
            {posts &&
            posts.map(({ node: post }) => (
              <div className="" key={post.id}>
                <article
                  className={`   ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                  <div className= "sidebar-post">
                    {post.frontmatter.featuredimage ? (
                      <div className="trending-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </div>
                    ) : null}
                    <p className="">
                      <Link
                        className="title post-title has-text-primary is-size-5"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                      <div className="post-date">
                        {post.frontmatter.date}
                      </div>
                      <div className="post-date">
                        
                      </div>
                    </p>
                    
                  </div>
                </article>
              </div>
            ))}
        </div>
    //   <div className="columns">
    //     <div className="column is-multiline">
    //     {posts &&
    //         posts.map(({ node: post }) => (
    //           <div className="" key={post.id}>
    //             <article
    //               className={`blog-list-item tile is-child box-post  ${
    //                 post.frontmatter.featuredpost ? 'is-featured' : ''
    //               }`}
    //             >
    //               <header>
    //                 {post.frontmatter.featuredimage ? (
    //                   <div className="featured-thumbnail trending-thumbnail">
    //                     <PreviewCompatibleImage
    //                       imageInfo={{
    //                         image: post.frontmatter.featuredimage,
    //                         alt: `featured image thumbnail for post ${post.frontmatter.title}`,
    //                       }}
    //                     />
    //                   </div>
    //                 ) : null}
    //                 <p className="post-meta">
    //                   <Link
    //                     className="title post-title has-text-primary is-size-5"
    //                     to={post.fields.slug}
    //                   >
    //                     {post.frontmatter.title}
    //                   </Link>
    //                   <div className="post-date">
    //                     {post.frontmatter.date}
    //                   </div>
    //                   <div className="post-date">
    //                     <p>
    //                       <br></br>
    //                       {post.frontmatter.description}
    //                     </p>
    //                   </div>
    //                 </p>
                    
    //               </header>
    //             </article>
    //           </div>
    //         ))}
    //     </div>
        
    //   </div>
      
      )
  }
}

Trending.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TrendingQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
    render={(data, count) => <Trending data={data} count={count} />}
  />
)
