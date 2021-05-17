import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.png'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <div className='w-full footer-container'>
        <footer className="sm:container lg:container mx-auto px-20 footer h-max mt-20 w-full py-10">
          <div className="content mx-auto w-full">
            <img
              className={'pb-10'}
              src={logo}
              alt="Kaldi"
              style={{ width: '10em' }}
            />
          </div>
          <div className="content">
            <div className="container">
              <div style={{ maxWidth: '100vw' }} className="grid-cols-12">
                <div className="col-span-4">
                    <ul className="menu-list">
                      <li>
                        <Link to="/" className="navbar-item text-xs">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className="navbar-item text-xs" to="/404">
                          About
                        </Link>
                      </li>
                      <li>
                        <a
                          className="navbar-item text-xs"
                          href="/admin/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Admin
                        </a>
                      </li>
                    </ul>
                </div>
                <div className="col-span-4">
                  <section>
                    <ul className="menu-list">
                      <li>
                        <Link className="navbar-item text-xs" to="/home">
                          Latest Stories
                        </Link>
                      </li>
                      <li>
                        <Link className="navbar-item text-xs" to="/404">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </section>
                </div>
                <div className="col-span-4"></div>
                {/* <div className="column is-4 social">
                  <a title="facebook" href="https://facebook.com">
                    <img
                      src={facebook}
                      alt="Facebook"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                  <a title="twitter" href="https://twitter.com">
                    <img
                      className="fas fa-lg"
                      src={twitter}
                      alt="Twitter"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                  <a title="instagram" href="https://instagram.com">
                    <img
                      src={instagram}
                      alt="Instagram"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                  <a title="vimeo" href="https://vimeo.com">
                    <img
                      src={vimeo}
                      alt="Vimeo"
                      style={{ width: '1em', height: '1em' }}
                    />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
