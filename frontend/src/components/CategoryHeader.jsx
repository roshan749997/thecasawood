import React from 'react'
import { Link } from 'react-router-dom'

export const navLinks = [
    { name: 'Beds', to: '/products?category=Beds' },
    { name: 'Coffee & Center Tables', to: '/products?category=Coffee & Center Tables' },
    { name: 'Dining Tables', to: '/products?category=Dining Tables' },
    { name: 'Polyester Fabric Sofas', to: '/products?category=Polyester Fabric Sofas' },
    { name: 'Leatherette Sofas', to: '/products?category=Leatherette Sofas' },
    { name: 'Lounge chair', to: '/products?category=Lounge chair' },
]

const CategoryHeader = ({ activeLink, setActiveLink }) => {
    return (
        <div className="py-2 overflow-x-auto no-scrollbar bg-white shadow-sm border-t border-gray-100">
            <div className="max-w-[1600px] mx-auto px-4 flex items-center sm:justify-start lg:justify-center min-w-max gap-4 sm:gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.to}
                        onClick={() => setActiveLink(link.name)}
                        className={`text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 border ${activeLink === link.name
                            ? 'text-[#8b5e3c] border-[#8b5e3c] bg-[#8b5e3c]/5'
                            : 'text-gray-700 border-transparent hover:text-[#8b5e3c] hover:bg-gray-50'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryHeader
