import React from 'react';
import { Link } from 'gatsby';

const Navbar = class extends React.Component {
    render() {
        const activeLinkStyle = {
            color: '#f25287',
        };
        return (
            <nav role="navigation" style={{
                background: 'rgba(21, 21, 21, 0.8)',
                backdropFilter: 'blur(10px)',
                }}>
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
                        <div className="navbar-menu flex space-x-4">
                            <Link
                                className="navbar-menu-item"
                                to="/blog"
                                activeStyle={activeLinkStyle}
                            >
                                Blog
                            </Link>
                            <Link
                                className="navbar-menu-item"
                                to="/til"
                                activeStyle={activeLinkStyle}
                            >
                                TIL
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
