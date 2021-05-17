import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import BackgroundImage from 'gatsby-background-image'

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  handleSubmit = e => {
        e.preventDefault();
        addToMailchimp(this.state.email) // listFields are optional if you are only capturing the email address.
        .then(data => {
        })
        .catch(() => {
        })
        document.getElementById("subscribe-button").disabled = true; 
        document.getElementById("subscribe-button").innerHTML = "Thanks!";
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }


  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
        <div className="">
        {posts &&
            posts.map(({ node: post }) => (
              <div className="" key={post.id}>
                  <div className=" mt-0 featured">
                      <div className="md:h-xxl h-80 landing-bg">
                        <BackgroundImage
                        className="h-full"
                          fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
                        >
                          <div className="h-full text-center mx-auto rounded-none"
                              // style={{
                              // display: 'flex',
                              // height: '150px',
                              // lineHeight: '1',
                              // justifyContent: 'space-around',
                              // alignItems: 'left',
                              // flexDirection: 'column',
                              // }}
                          >
                                <h1
                                className="relative top-1/3 md:top-1/4 font-oswald text-primary px-5 lg:px-0 text-2xl font-bold has-text-weight-bold"
                                // style={{
                                //     boxShadow:
                                //     'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                                //     backgroundColor: 'rgb(255, 68, 0)',
                                //     color: 'white',
                                //     lineHeight: '1',
                                //     padding: '0.25em',
                                // }}
                                >
                                Never Miss Another Game Offers Again!
                                </h1>
                              <h3
                              className="relative top-1/3 md:top-1/4 font-open text-content lg:text-sm text-xs  px-5 lg:px-0"
                              // style={{
                              //     boxShadow:
                              //     'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                              //     backgroundColor: 'rgb(255, 68, 0)',
                              //     color: 'white',
                              //     lineHeight: '1',
                              //     padding: '0.25em',
                              // }}
                              >
                              We curate free/discounted game offers from multiple sources so you can play your favorite titles on a deal!<br></br>
                              Subscribe to receive new offers every week.
                              </h3>
                              <form onSubmit={this.handleSubmit} className="relative top-1/4 md:top-1/4 subscribe-form w-full mx-auto text-center mt-10">
                                
                                <input type="text" id="email" name="email" placeholder="Your Email"
                                value={this.state.email}
                                onChange={this.handleInputChange} 
                                className="subscribe-input rounded-md font-open h-10 w-1/2 "/>
                                <button type="submit"  className="font-oswald rounded-md bg-primary h-10 px-3 disabled:bg-gray-500 disabled:duration-1000 ml-4" id="subscribe-button">Subscribe</button>
                              </form>
                              <h3
                              className="relative top-1/3 md:top-1/4 font-open text-content lg:text-xs text-xs  px-5 lg:px-0"
                              // style={{
                              //     boxShadow:
                              //     'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                              //     backgroundColor: 'rgb(255, 68, 0)',
                              //     color: 'white',
                              //     lineHeight: '1',
                              //     padding: '0.25em',
                              // }}
                              >
                              Or scroll down to see ongoing deals.
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

Landing.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TestQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1 
          filter: { frontmatter: { templateKey: { in: ["blog-post","guides-post","news-post","review-post"] }, featuredpost: {eq: true} } }
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
    render={(data, count) => <Landing data={data} count={count} />}
  />
)
