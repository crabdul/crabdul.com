import React from 'react'

const Footer = () => {
    const date = new Date().toString().split(' ').slice(1,4).join(' ')
    return (
        <footer className="container">
            <div className="footer">
                <p>
                    <a href="https://github.com/crabdul">crabdul</a> /{' '}
                    <a href="mailto:karim.elkhazaani@zoho.com">
                        karim.elkhazaani@zoho.com
                    </a>
                </p>
                <p>
                    Last Update: <small>{date}</small>
                </p>
            </div>
        </footer>
    )}

export default Footer
