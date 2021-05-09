import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Featured from '../components/featured/Featured'
import Trending from '../components/Trending'
import SEO from '../components/seo'

export const IndexPageTemplate = ({
  title,
  heading,
  subheading,
  description,
}) => (
  
  <div>
    <SEO/>
    <Featured/>
    <section className="section section--gradient">
      <div className=" container mx-auto lg:px-20 md:px-20">
        <div className="section">
          <div className="grid grid-cols-12">
            <div className="col-span-12 ">
              <div className="content grid grid-cols-12">
                <div className="lg:col-span-8 col-span-12">
                  
                  <BlogRoll />
                  {/* <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div> */}
                </div>
 
                <div className='lg:col-span-4 col-span-12'>
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
