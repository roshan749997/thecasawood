import { useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Wooden King Size Bed',
            category: 'Beds',
            price: 45999,
            originalPrice: 64999,
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
            quantity: 1,
            inStock: true,
            delivery: 'Tomorrow, 11 PM',
            seller: 'CASAWOOD'
        },
        {
            id: 2,
            name: 'Modern L-Shape Sofa Set',
            category: 'Sofas',
            price: 52999,
            originalPrice: 74999,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
            quantity: 1,
            inStock: true,
            delivery: '2 Days',
            seller: 'CASAWOOD'
        }
    ])

    const [savedForLater, setSavedForLater] = useState([])

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const saveForLater = (item) => {
        setSavedForLater([...savedForLater, item])
        removeItem(item.id)
    }

    const moveToCart = (item) => {
        setCartItems([...cartItems, { ...item, quantity: 1 }])
        setSavedForLater(savedForLater.filter(i => i.id !== item.id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
    const deliveryCharges = subtotal > 50000 ? 0 : 500
    const total = subtotal - discount + deliveryCharges

    if (cartItems.length === 0 && savedForLater.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
                <div className="text-center max-w-md px-4">
                    <div className="mb-6">
                        <svg className="w-32 h-32 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-6">Add items to your cart to get started</p>
                    <Link
                        to="/products"
                        className="inline-block px-8 py-3 bg-[#8b5e3c] text-white font-semibold rounded-lg hover:bg-[#70482d] transition-colors shadow-md hover:shadow-lg"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen py-4 md:py-6">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Column - Cart Items */}
                    <div className="flex-1">
                        {/* Cart Items */}
                        {cartItems.length > 0 && (
                            <div className="bg-white rounded-sm shadow-sm mb-4">
                                <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        My Cart ({cartItems.length})
                                    </h2>
                                    <Link to="/products" className="text-sm text-[#8b5e3c] font-medium hover:text-[#70482d]">
                                        + Add More Items
                                    </Link>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between gap-4 mb-2">
                                                        <div className="flex-1">
                                                            <Link to={`/product/${item.id}`} className="text-base md:text-lg font-medium text-gray-900 hover:text-[#8b5e3c] line-clamp-2">
                                                                {item.name}
                                                            </Link>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Category: {item.category} | Seller: {item.seller}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                                            aria-label="Remove item"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="text-xl md:text-2xl font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                        <span className="text-sm text-gray-500 line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                                                        <span className="text-sm text-[#8b5e3c] font-bold">
                                                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                                                        </span>
                                                    </div>

                                                    {/* Delivery Info */}
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                        </svg>
                                                        <span>Delivery by <span className="font-medium text-gray-900">{item.delivery}</span></span>
                                                        {deliveryCharges === 0 && <span className="text-[#8b5e3c] font-bold ml-2">FREE</span>}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        {/* Quantity Selector */}
                                                        <div className="flex items-center border border-gray-300 rounded-sm">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="px-4 py-1.5 border-x border-gray-300 font-medium text-gray-900 min-w-[50px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => saveForLater(item)}
                                                            className="text-sm font-medium text-gray-700 hover:text-[#8b5e3c] transition-colors"
                                                        >
                                                            SAVE FOR LATER
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Place Order Button - Mobile */}
                                <div className="lg:hidden p-4 border-t border-gray-200">
                                    <Link
                                        to="/address"
                                        className="block w-full py-3 bg-[#5c4033] text-white text-center font-bold uppercase rounded-sm hover:bg-[#3e2b22] transition-colors shadow-md"
                                    >
                                        Place Order
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Saved For Later */}
                        {savedForLater.length > 0 && (
                            <div className="bg-white rounded-sm shadow-sm">
                                <div className="px-4 md:px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Saved For Later ({savedForLater.length})
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {savedForLater.map((item) => (
                                        <div key={item.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex gap-4">
                                                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                                                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => moveToCart(item)}
                                                            className="text-sm font-medium text-[#8b5e3c] hover:text-[#70482d] transition-colors"
                                                        >
                                                            MOVE TO CART
                                                        </button>
                                                        <button
                                                            onClick={() => setSavedForLater(savedForLater.filter(i => i.id !== item.id))}
                                                            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors"
                                                        >
                                                            REMOVE
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Price Details (Sticky) */}
                    {cartItems.length > 0 && (
                        <div className="lg:w-[380px] flex-shrink-0">
                            <div className="bg-white rounded-sm shadow-sm sticky top-20">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">Price Details</h2>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-700">Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                        <span className="font-medium text-gray-900">₹{(subtotal + discount).toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-700">Discount</span>
                                        <span className="font-medium text-[#8b5e3c]">− ₹{discount.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-700">Delivery Charges</span>
                                        <span className="font-medium">
                                            {deliveryCharges === 0 ? (
                                                <span className="text-[#8b5e3c]">FREE</span>
                                            ) : (
                                                `₹${deliveryCharges}`
                                            )}
                                        </span>
                                    </div>

                                    {subtotal < 50000 && (
                                        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-sm">
                                            Add items worth ₹{(50000 - subtotal).toLocaleString()} more to get FREE delivery
                                        </div>
                                    )}

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span className="text-gray-900">Total Amount</span>
                                            <span className="text-gray-900">₹{total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-[#8b5e3c] font-medium bg-[#8b5e3c]/10 p-3 rounded-sm">
                                        You will save ₹{discount.toLocaleString()} on this order
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-200">
                                    <Link
                                        to="/address"
                                        className="block w-full py-3 bg-[#5c4033] text-white text-center font-bold uppercase rounded-sm hover:bg-[#3e2b22] transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Place Order
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
