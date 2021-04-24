import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="container">
            <div className="footer bg-darkpurple text-gray-400 border-t border-gray-500">
                <p>
                    <a
                        href="https://github.com/crabdul"
                        target="_blank"
                        className=""
                    >
                        Github: crabdul
                    </a>{' '}
                    /{' '}
                    <a
                        href="https://www.linkedin.com/in/el-khazaani/"
                        target="_blank"
                        className=""
                    >
                        LinkedIn
                    </a>
                </p>
                <p>{date}</p>
            </div>
        </footer>
    );
};

export default Footer;
