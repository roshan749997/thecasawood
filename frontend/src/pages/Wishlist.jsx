import { useState } from 'react'
import { Link } from 'react-router-dom'

const Wishlist = () => {
    const [selectedItems, setSelectedItems] = useState([])
    const [sortBy, setSortBy] = useState('newest')
    const [filterBy, setFilterBy] = useState('all')

    // Mock wishlist data
    const wishlistItems = [
        {
            id: 1,
            name: 'Premium Wooden King Size Bed',
            category: 'Bedroom',
            price: 45999,
            originalPrice: 65999,
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500',
            inStock: true,
            discount: 30,
            rating: 4.5,
            reviews: 234,
            addedOn: '2024-01-15'
        },
        {
            id: 2,
            name: 'Luxury Wooden Dining Table',
            category: 'Dining',
            price: 65999,
            originalPrice: 89999,
            image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500',
            inStock: true,
            discount: 27,
            rating: 4.8,
            reviews: 456,
            addedOn: '2024-01-12'
        },
        {
            id: 3,
            name: 'Premium Leather Recliner',
            category: 'Living Room',
            price: 42999,
            originalPrice: 59999,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
            inStock: true,
            discount: 28,
            rating: 4.6,
            reviews: 189,
            addedOn: '2024-01-10'
        },
        {
            id: 4,
            name: 'Modern L-Shape Sofa Set',
            category: 'Living Room',
            price: 89999,
            originalPrice: 129999,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
            inStock: false,
            discount: 31,
            rating: 4.7,
            reviews: 567,
            addedOn: '2024-01-08'
        },
        {
            id: 5,
            name: 'Elegant Wooden Wardrobe',
            category: 'Bedroom',
            price: 52999,
            originalPrice: 74999,
            image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500',
            inStock: true,
            discount: 29,
            rating: 4.4,
            reviews: 312,
            addedOn: '2024-01-05'
        },
        {
            id: 6,
            name: 'Classic Wooden Study Table',
            category: 'Office',
            price: 18999,
            originalPrice: 26999,
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500',
            inStock: true,
            discount: 30,
            rating: 4.3,
            reviews: 145,
            addedOn: '2024-01-03'
        }
    ]

    // Filter and sort logic
    const getFilteredItems = () => {
        let filtered = [...wishlistItems]

        if (filterBy === 'in-stock') {
            filtered = filtered.filter(item => item.inStock)
        } else if (filterBy === 'out-of-stock') {
            filtered = filtered.filter(item => !item.inStock)
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price)
        } else if (sortBy === 'discount') {
            filtered.sort((a, b) => b.discount - a.discount)
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
        }

        return filtered
    }

    const filteredItems = getFilteredItems()

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleSelectAll = () => {
        if (selectedItems.length === filteredItems.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(filteredItems.map(item => item.id))
        }
    }

    const handleRemoveSelected = () => {
        setSelectedItems([])
        // In real app, this would remove items from wishlist
    }

    const handleMoveToCart = () => {
        // In real app, this would add selected items to cart
        console.log('Moving to cart:', selectedItems)
    }

    const totalSavings = filteredItems.reduce((sum, item) => {
        return sum + (item.originalPrice - item.price)
    }, 0)

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                My Wishlist
                            </h1>
                            <p className="text-gray-600">
                                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} •
                                <span className="text-green-600 font-semibold ml-1">
                                    Save ₹{totalSavings.toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Link
                                to="/products"
                                className="flex-1 md:flex-none px-6 py-2.5 border-2 border-[#8b5e3c] text-[#8b5e3c] rounded-lg hover:bg-[#8b5e3c] hover:text-white transition-colors font-medium text-center"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filters and Sort */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Bulk Actions */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                                    onChange={handleSelectAll}
                                    className="form-checkbox h-5 w-5 text-[#8b5e3c] rounded focus:ring-[#8b5e3c]"
                                />
                                <span className="text-sm font-medium text-gray-700">Select All</span>
                            </label>
                            {selectedItems.length > 0 && (
                                <>
                                    <span className="text-sm text-gray-500">
                                        {selectedItems.length} selected
                                    </span>
                                    <button
                                        onClick={handleMoveToCart}
                                        className="px-4 py-1.5 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors text-sm font-medium"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleRemoveSelected}
                                        className="px-4 py-1.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Filter and Sort */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent text-sm"
                            >
                                <option value="all">All Items</option>
                                <option value="in-stock">In Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent text-sm"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="discount">Highest Discount</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Wishlist Items */}
                {filteredItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
                        <p className="text-gray-600 mb-6">Save items you love for later!</p>
                        <Link
                            to="/products"
                            className="inline-block px-8 py-3 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all ${selectedItems.includes(item.id) ? 'ring-2 ring-[#8b5e3c]' : ''
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 group">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {item.discount > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                {item.discount}% OFF
                                            </span>
                                        )}
                                        {!item.inStock && (
                                            <span className="bg-gray-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                Out of Stock
                                            </span>
                                        )}
                                        {item.inStock && (
                                            <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                In Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Checkbox */}
                                    <div className="absolute top-2 right-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                            className="form-checkbox h-4 w-4 text-[#8b5e3c] rounded focus:ring-[#8b5e3c] bg-white"
                                        />
                                    </div>

                                    {/* Remove Button */}
                                    <button className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-lg hover:bg-red-50 transition-colors group/remove">
                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-3">
                                    {/* Category */}
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                                        {item.category}
                                    </span>

                                    {/* Name */}
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="font-semibold text-sm text-gray-900 mt-1 mb-1.5 line-clamp-2 hover:text-[#8b5e3c] transition-colors leading-tight">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <div className="flex items-center gap-0.5">
                                            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-xs font-semibold text-gray-900">{item.rating}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500">({item.reviews})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1.5 mb-2">
                                        <span className="text-lg font-bold text-gray-900">
                                            ₹{item.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-500 line-through">
                                            ₹{item.originalPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Savings */}
                                    <div className="bg-green-50 border border-green-200 rounded px-2 py-1 mb-2">
                                        <p className="text-[10px] text-green-700 font-medium">
                                            Save ₹{(item.originalPrice - item.price).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1.5">
                                        <button
                                            disabled={!item.inStock}
                                            className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${item.inStock
                                                    ? 'bg-[#8b5e3c] text-white hover:bg-[#70482d]'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {item.inStock ? 'Add to Cart' : 'Notify'}
                                        </button>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="px-2 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary Card */}
                {filteredItems.length > 0 && (
                    <div className="bg-gradient-to-r from-[#8b5e3c] to-[#5c4033] rounded-lg shadow-lg p-6 mt-6 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{filteredItems.length}</div>
                                <div className="text-white/80 text-sm">Items in Wishlist</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">₹{totalSavings.toLocaleString()}</div>
                                <div className="text-white/80 text-sm">Total Savings</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">
                                    {filteredItems.filter(item => item.inStock).length}
                                </div>
                                <div className="text-white/80 text-sm">Available Now</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
