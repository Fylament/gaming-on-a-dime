import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Featured from '../components/featured/Featured'
import Trending from '../components/Trending'
import SEO from '../components/seo'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  description,
}) => (
  
  <div>
    <SEO/>
    <Featured/>
    <section className="section section--gradient">
      <div className="container">
      <h1>This site is under development. All articles provided in this site are fake, placeholder news for development purposes only.</h1>
        <div className="section">
          <div className="columns">
            <div className="column is-12 ">
              <div className="content columns">
                <div className="column is-8">
                  
                  <BlogRoll />
                  {/* <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div> */}
                </div>
 
                <div className='column is-4'>
                  <Trending />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
      }
    }
  }
`
