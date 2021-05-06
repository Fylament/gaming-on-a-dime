import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div className="container m-auto pl-40 h-80 pt-40 md:w-full sm:w-auto">
      <h1 className="text-404 typewriter-text md:text-s sm:text-xs">You've come to a dead end. There's nothing here.</h1>
      <br></br>
      <Link to="/" className=" text-xs text-404 hover:text-404-hover">
      {'>'}Turn Back
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
