import Image from 'next/image';
import React from 'react';
import Logo from '../assets/highpreLogo.png'

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-center items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <Image
                        src={Logo}
                        alt="SEO Analyzer Logo"
                        className="w-[10vw] h-[2vw]"
                        height={2000}
                        weight={2000}
                    />
                    {/* <span className="text-2xl font-bold text-indigo-700">SEO Analyzer</span> */}
                </div>

                {/* Navigation Links */}
                {/* <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-slate-700 hover:text-indigo-700 font-medium">Home</a>
                    <a href="/features" className="text-slate-700 hover:text-indigo-700 font-medium">Features</a>
                    <a href="/pricing" className="text-slate-700 hover:text-indigo-700 font-medium">Pricing</a>
                    <a href="/contact" className="text-slate-700 hover:text-indigo-700 font-medium">Contact</a>
                </nav> */}

                {/* Call to Action */}
                {/* <a
                    href="/get-started"
                    className="hidden md:inline-block px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 font-medium"
                >
                    Get Started
                </a> */}

                {/* Mobile Menu */}
                {/* <button
                    className="md:hidden flex items-center px-3 py-2 border rounded text-indigo-600 border-indigo-600 hover:text-indigo-700 hover:border-indigo-700"
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button> */}
            </div>
        </header>
    );
};

export default Header;
