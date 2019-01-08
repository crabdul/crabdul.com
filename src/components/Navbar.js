import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {


 render() {
	const activeLinkStyle = {
		color: "rgb(233, 30, 99)",
	}
   return (

  <nav role="navigation">
       <div className="container">
       <div className="navbar" role="navigation" aria-label="main-navigation">
       <Link className="navbar-home" to="/">
            crab.land
        </Link>
       <div className="navbar-menu">
        <Link className="navbar-menu-item" to="/about" activeStyle={activeLinkStyle}>
          About
        </Link>
        <Link className="navbar-menu-item" to="/" activeStyle={activeLinkStyle}>
          Photos
        </Link>
       </div>
        <a
          className="navbar-portfolio"
          href="https://elkhazaani.space/"
          target="_blank"
          rel="noopener noreferrer"
        >
            <span role="img" aria-label="save icon">💾</span>
        </a>
       </div>
       </div>
  </nav>
  )}
}

export default Navbar
