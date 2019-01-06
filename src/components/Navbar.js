import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {


 render() {
	const activeLinkStyle = {
		color: "rgb(233, 30, 99)",
	}
   return (

  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
    <div className="container">
        <Link to="/" className="navbar-item" title="Logo">
            crab.land
        </Link>
        <Link className="navbar-item" to="/about" activeStyle={activeLinkStyle}>
          About
        </Link>
        <Link className="navbar-item" to="/" activeStyle={activeLinkStyle}>
          Photos
        </Link>
        <a
          className="navbar-item"
          href="https://elkhazaani.space/"
          target="_blank"
          rel="noopener noreferrer"
        >
            elkhazaani.space
        </a>
      </div>
  </nav>
  )}
}

export default Navbar
