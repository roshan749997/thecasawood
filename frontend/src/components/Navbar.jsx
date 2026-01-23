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
                        <img
                            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077778/Casawood_logo_500x-8_pzbmu9.png"
                            alt="Casawood Logo"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
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

                    {/* Right - Search and Icons */}
                    <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-3 2xl:space-x-4 flex-1 justify-end min-w-0">
                        {/* Search Bar */}
                        <div className="relative hidden lg:block">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-32 lg:w-36 xl:w-40 2xl:w-56 pl-8 lg:pl-9 pr-3 lg:pr-4 py-1.5 text-xs xl:text-xs 2xl:text-sm text-gray-700 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white placeholder:text-gray-400 placeholder:font-normal"
                            />
                            <svg
                                className="absolute left-2.5 lg:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Track Your Order - Desktop */}
                        <a href="#track-order" className="hidden 2xl:flex items-center space-x-2 hover:opacity-100 hover:text-[#8b5e3c] transition-all whitespace-nowrap group">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m1.5-9l1.96 2.5H17V9.5M6 18.5A1.5 1.5 0 014.5 17 1.5 1.5 0 016 15.5 1.5 1.5 0 017.5 17 1.5 1.5 0 016 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 003 3 3 3 0 003-3h6a3 3 0 003 3 3 3 0 003-3h2v-5l-3-4z" />
                            </svg>
                            <span className="text-[10px] 2xl:text-[11px] font-semibold text-gray-400 group-hover:text-[#8b5e3c] uppercase tracking-wide">
                                Track Your Order
                            </span>
                        </a>

                        {/* Icons */}
                        <div className="flex items-center space-x-1.5 xl:space-x-2 2xl:space-x-3">
                            {/* Location Icon */}
                            <a href="#location" className="hover:text-[#8b5e3c] transition-colors p-1 touch-manipulation">
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="#374151" strokeWidth="1.5" />
                                    <circle cx="12" cy="9" r="2" fill="none" stroke="#374151" strokeWidth="1.5" />
                                </svg>
                            </a>

                            {/* Profile Icon */}
                            <a href="#profile" className="hover:text-[#8b5e3c] transition-colors p-1 touch-manipulation">
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="3.5" fill="none" stroke="#374151" strokeWidth="1.5" />
                                    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </a>

                            {/* Wishlist Icon */}
                            <a href="#wishlist" className="hover:text-[#8b5e3c] transition-colors p-1 touch-manipulation">
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#374151" strokeWidth="1.5" />
                                </svg>
                            </a>

                            {/* Cart Icon */}
                            <a href="#cart" className="hover:text-[#8b5e3c] transition-colors p-1 relative touch-manipulation">
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 2L7.17 4H3C2.45 4 2 4.45 2 5C2 5.55 2.45 6 3 6H4L7.6 13.59L6.25 16.04C5.52 17.37 6.48 19 8 19H19C19.55 19 20 18.55 20 18C20 17.45 19.55 17 19 17H8L9.1 15H16.55C17.3 15 17.96 14.59 18.3 13.97L21.88 7.48C22.25 6.82 21.77 6 21.01 6H6.21L5.27 4H9V2Z" fill="none" stroke="#374151" strokeWidth="1.5" />
                                    <circle cx="8" cy="20.5" r="1.5" fill="#374151" />
                                    <circle cx="17" cy="20.5" r="1.5" fill="#374151" />
                                </svg>
                            </a>
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
