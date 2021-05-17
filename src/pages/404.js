import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div className="container mx-auto lg:mx-40  h-80 pt-40">
      <h1 className="text-404 md:text-s text-xs px-20">You've come to a dead end. There's nothing here.</h1>
      <br></br>
      <Link to="/" className=" text-xs text-404 hover:text-404-hover px-20">
      {'>'}Turn Back
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
