import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.png'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      // <div className='w-full navbar-container'>
      //   <nav
      //     className="sm:container md:container navbar h-12 my-0 mx-auto px-20" 
      //     role="navigation"
      //     aria-label="main-navigation"
      //   >
      //     <div className="h-full align-middle">
      //       <div className="navbar-brand h-full w-max px-5 float-left">
      //         <Link to="/" className="navbar-item" title="Logo">
      //           <img className="h-4/6" src={logo} alt="Gaming on a Dime" 
      //           //style={{ width: "8px",height:"auto" }}
      //           />
      //         </Link>
      //         {/* Hamburger menu */}
      //         <div
      //           className={`navbar-burger burger ${this.state.navBarActiveClass}`}
      //           data-target="navMenu"
      //           onClick={() => this.toggleHamburger()}
      //         >
      //           <span />
      //           <span />
      //           <span />
      //         </div>
      //       </div>
      //       <div
      //         id="navMenu"
      //         className={`navbar-menu w-1/4 float-left  ${this.state.navBarActiveClass}`}
      //       >
      //         <div className="navbar-start has-text-centered w-1/4 float-left">
      //           <Link className="navbar-item px-3 text-xs" to="/">
      //             Home
      //           </Link>
      //           <Link className="navbar-item px-3 text-xs" to="/blog-posts">
      //             Blog
      //           </Link>
      //           <Link className="navbar-item px-3 text-xs" to="/news">
      //             News
      //           </Link>
      //           <Link className="navbar-item px-3 text-xs" to="/reviews">
      //             Reviews
      //           </Link>
      //           <Link className="navbar-item px-3 text-xs" to="/guides">
      //             Guides
      //           </Link>
      //         </div>
      //       </div>
      //     </div>
      //   </nav>
      // </div>
      <div className="lg:px-16 px-6  flex flex-wrap items-center lg:py-0 py-2 w-full navbar-container lg:pl-20">
        <div className="lg:flex-initial flex-1 flex justify-start items-center">
          <Link to="/" className="navbar-item" title="Logo">
            <img className="h-3/6 w-20 mr-10" src={logo} alt="Gaming on a Dime"
            />
          </Link>
        </div>
        <label for="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg class="" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
        </label>
        <input type="checkbox" className="hidden" id="menu-toggle"></input>
        <div class="hidden lg:flex lg:w-auto w-full" id="menu">
          <nav>
            <ul class="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
              <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white navbar-item px-3 text-xs" to="/">Home</Link></li>
              <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white navbar-item px-3 text-xs" to="/blog-posts">Blog</Link></li>
              <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white navbar-item px-3 text-xs" to="/news">News</Link></li>
              <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white navbar-item px-3 text-xs" to="/reviews">Reviews</Link></li>
              <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white lg:mb-0 mb-2 navbar-item px-3 text-xs" to="/guides">Guides</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Navbar
