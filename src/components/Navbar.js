import React from 'react';
import { Link } from 'gatsby';

const Navbar = class extends React.Component {
    render() {
        const activeLinkStyle = {
            color: '#f25287',
        };
        return (
            <nav role="navigation">
                <div className="container">
                    <div
                        className="navbar"
                        role="navigation"
                        aria-label="main-navigation"
                    >
                        <div>
                            <Link className="navbar-home" to="/">
                                crabdul.com
                            </Link>
                        </div>
                        <div className="navbar-menu">
                            <Link
                                className="navbar-menu-item"
                                to="/"
                                activeStyle={activeLinkStyle}
                            >
                                Blog
                            </Link>
                        </div>
                        <div className="navbar-portfolio">
                            <Link
                                className="navbar-menu-item"
                                to="/about"
                                activeStyle={activeLinkStyle}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;
