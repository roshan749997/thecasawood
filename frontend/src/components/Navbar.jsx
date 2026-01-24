import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('Beds')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Beds', to: '/products' },
        { name: 'Coffee & Center Tables', to: '/products' },
        { name: 'Dining Tables', to: '/products' },
        { name: 'Polyester Fabric Sofas', to: '/products' },
        { name: 'Leatherette Sofas', to: '/products' },
    ]

    const rightLinks = [
        { icon: '📍', text: 'FRANCHISE', href: '#franchise' },
        { icon: '📞', text: '9810707042', href: 'tel:9810707042' },
        { icon: '🛒', text: 'SUBMIT', href: '#submit' },
        { icon: '📦', text: 'TRACK YOUR ORDER', href: '#track' },
    ]

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Mobile & Tablet Header (below lg) */}
                <div className="flex items-center justify-between h-16 md:h-18 lg:hidden">
                    {/* Mobile Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077778/Casawood_logo_500x-8_pzbmu9.png"
                                alt="Casawood Logo"
                                className="h-8 sm:h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Mobile Right Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Cart Icon - Mobile */}
                        <Link to="/cart" className="p-1.5 sm:p-2 text-gray-600 hover:text-[#8b5e3c] relative touch-manipulation">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 2L7.17 4H3C2.45 4 2 4.45 2 5C2 5.55 2.45 6 3 6H4L7.6 13.59L6.25 16.04C5.52 17.37 6.48 19 8 19H19C19.55 19 20 18.55 20 18C20 17.45 19.55 17 19 17H8L9.1 15H16.55C17.3 15 17.96 14.59 18.3 13.97L21.88 7.48C22.25 6.82 21.77 6 21.01 6H6.21L5.27 4H9V2Z" />
                                <circle cx="8" cy="20.5" r="1.5" fill="currentColor" />
                                <circle cx="17" cy="20.5" r="1.5" fill="currentColor" />
                            </svg>
                        </Link>

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-[#8b5e3c] touch-manipulation"
                            aria-label="Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Header (lg and above) */}
                <div className="hidden lg:flex items-center h-20 relative">
                    {/* Left Navigation Links */}
                    <div className="flex items-center space-x-1 xl:space-x-2 2xl:space-x-3 flex-1 min-w-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                onClick={() => setActiveLink(link.name)}
                                className={`text-[9px] xl:text-[10px] 2xl:text-[11px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap uppercase truncate ${activeLink === link.name
                                    ? 'text-[#8b5e3c] border border-[#8b5e3c] rounded-full px-2 xl:px-3 2xl:px-4 py-1.5'
                                    : 'text-gray-900 hover:text-[#8b5e3c] px-1.5 xl:px-2 py-1.5'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                        <Link to="/">
                            <img
                                src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077778/Casawood_logo_500x-8_pzbmu9.png"
                                alt="Casawood Logo"
                                className="h-12 xl:h-14 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Right - Track Order and Icons */}
                    <div className="flex items-center space-x-3 xl:space-x-4 2xl:space-x-6 flex-1 justify-end min-w-0">
                        {/* Track Your Order */}
                        <a href="#track-order" className="hidden xl:flex items-center gap-2 text-gray-500 hover:text-[#8b5e3c] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">Track Your Order</span>
                        </a>

                        {/* Icons */}
                        <div className="flex items-center space-x-2 xl:space-x-3">
                            {/* Location Icon */}
                            <a href="#location" className="text-gray-500 hover:text-[#8b5e3c] transition-colors p-1.5">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </a>

                            {/* Profile Icon */}
                            <Link to="/profile" className="text-gray-500 hover:text-[#8b5e3c] transition-colors p-1.5">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </Link>

                            {/* Wishlist Icon */}
                            <Link to="/wishlist" className="text-gray-500 hover:text-[#8b5e3c] transition-colors p-1.5">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </Link>

                            {/* Cart Icon */}
                            <Link to="/cart" className="text-gray-500 hover:text-[#8b5e3c] transition-colors p-1.5 relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-200">
                        {/* Mobile Search */}
                        <div className="px-4 py-3 border-b border-gray-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:bg-white"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="px-3 sm:px-4 py-2 max-h-[60vh] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    onClick={() => {
                                        setActiveLink(link.name)
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className={`block py-3 px-4 text-sm font-semibold tracking-wide uppercase transition-all duration-200 border-b border-gray-100 last:border-b-0 touch-manipulation ${activeLink === link.name
                                        ? 'text-[#8b5e3c] bg-[#8b5e3c]/10 rounded-lg'
                                        : 'text-gray-900 hover:text-[#8b5e3c] hover:bg-gray-50 active:bg-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Right Links */}
                        <div className="px-3 sm:px-4 py-3 border-t border-gray-200 space-y-1">
                            {rightLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 py-2.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    <span>{link.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
