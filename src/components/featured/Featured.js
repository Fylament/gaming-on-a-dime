import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

class Featured extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
        <div className="">
        {posts &&
            posts.map(({ node: post }) => (
              <div className="" key={post.id}>
                  <div className=" mt-0 featured ">
                      <div className="md:h-xxl h-80 featured-bg">
                        <BackgroundImage
                        className="h-full"
                          fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
                        >
                          <div className="h-full text-center mx-auto rounded-none "
                              // style={{
                              // display: 'flex',
                              // height: '150px',
                              // lineHeight: '1',
                              // justifyContent: 'space-around',
                              // alignItems: 'left',
                              // flexDirection: 'column',
                              // }}
                          >
                              <Link
                                to={post.fields.slug}
                              >
                                <h1
                                className="relative top-2/4 md:top-2/3 font-oswald text-primary px-5 lg:px-0 text-2xl font-bold has-text-weight-bold"
                                // style={{
                                //     boxShadow:
                                //     'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                                //     backgroundColor: 'rgb(255, 68, 0)',
                                //     color: 'white',
                                //     lineHeight: '1',
                                //     padding: '0.25em',
                                // }}
                                >
                                {post.frontmatter.title}
                                </h1>
                              </Link>
                              <h3
                              className="relative top-2/4 md:top-2/3 font-open text-content text-xs px-5 lg:px-0"
                              // style={{
                              //     boxShadow:
                              //     'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                              //     backgroundColor: 'rgb(255, 68, 0)',
                              //     color: 'white',
                              //     lineHeight: '1',
                              //     padding: '0.25em',
                              // }}
                              >
                              {post.frontmatter.description}
                              </h3>
                          </div>
                        </BackgroundImage>
                          
                          </div>
                      </div>
                    
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

Featured.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1 
          filter: { frontmatter: { templateKey: { eq: "blog-post" }, featuredpost: {eq: true} } }
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
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Featured data={data} count={count} />}
  />
)
