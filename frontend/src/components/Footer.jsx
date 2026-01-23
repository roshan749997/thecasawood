import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#3e2b22] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <img
                            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077778/Casawood_logo_500x-8_pzbmu9.png"
                            alt="Casawood Logo"
                            className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Crafting elegance for your home since 1980. We bring you premium quality wooden furniture that blends tradition with modern design.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {/* Social Icons */}
                            {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href={`#${social}`}
                                    className="w-8 h-8 rounded-full bg-[#5c4033] flex items-center justify-center hover:bg-[#8b5e3c] transition-colors"
                                    aria-label={social}
                                >
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v-1.293c0-2.005 1.194-3.133 3.022-3.133 0.876 0 1.628 0.065 1.848 0.094v2.144h-1.267c-0.972 0-1.16 0.461-1.16 1.141v1.047h2.384l-0.311 2h-2.073v6z" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#d4c4b7] uppercase tracking-wide">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/" className="hover:text-[#8b5e3c] transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-[#8b5e3c] transition-colors">All Products</Link></li>
                            <li><Link to="/products?category=Beds" className="hover:text-[#8b5e3c] transition-colors">Beds</Link></li>
                            <li><Link to="/products?category=Sofas" className="hover:text-[#8b5e3c] transition-colors">Sofas</Link></li>
                            <li><Link to="/products?category=Dining" className="hover:text-[#8b5e3c] transition-colors">Dining</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#d4c4b7] uppercase tracking-wide">Customer Service</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="#track" className="hover:text-[#8b5e3c] transition-colors">Track Order</a></li>
                            <li><a href="#returns" className="hover:text-[#8b5e3c] transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#shipping" className="hover:text-[#8b5e3c] transition-colors">Shipping Policy</a></li>
                            <li><a href="#terms" className="hover:text-[#8b5e3c] transition-colors">Terms & Conditions</a></li>
                            <li><a href="#privacy" className="hover:text-[#8b5e3c] transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#d4c4b7] uppercase tracking-wide">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-[#8b5e3c] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>123 Furniture Street, Woodville,<br />Design District, 400001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@thecasawood.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#5c4033] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} TheCasaWood. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
