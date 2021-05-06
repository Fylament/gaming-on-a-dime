import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class Trending extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
        <div className="sidebar-container mt-10 lg:mt-0 border-t border-secondary md:border-0 pt-10 lg:pt-0">
        <span className="section-label lg:pl-8 pl-5 italic text-content font-medium font-oswald">Featured</span>
            {posts &&
            posts.map(({ node: post }) => (
              <div className="" key={post.id}>
                <article
                  className={`   ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                  <div className= "sidebar-post grid  grid-cols-12 gap-4 pl-5 pt-4 lg:ml-3">
                    {post.frontmatter.featuredimage ? (
                      <div className="trending-thumbnail col-span-4">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </div>
                    ) : null}
                    <p className="col-span-8">
                      <Link
                        className="title font-oswald text-primary no-underline"
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
          filter: { frontmatter: { templateKey: {  in: ["blog-post", "guides-post", "review-post", "news-post"]}, featuredpost: {eq: true}} }
          limit: 6
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
                    fluid(quality: 100, maxWidth: 400,maxHeight: 400) {
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
