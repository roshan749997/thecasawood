import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

const ProductDetail = () => {
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState(0)
    const [pincode, setPincode] = useState('')
    const [checkPincode, setCheckPincode] = useState(false)

    // Find product by ID
    const product = products.find(p => p.id === parseInt(id))

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-[#8b5e3c] hover:text-[#70482d] font-semibold">
                        Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    // Prepare images (ensure multiple)
    const images = product.images ? product.images : [
        product.image,
        product.image,
        product.image,
        product.image
    ];

    // Calculate discount
    const originalPrice = product.originalPrice || Math.round(product.price * 1.4); // Mock original price if missing
    const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    const offers = [
        "Bank Offer 5% Unlimited Cashback on Axis Bank Credit Card",
        "Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction",
        "Special Price Get extra 20% off (price inclusive of cashback/coupon)",
        "Partner Offer Sign up for Casawood Pay Later and get Casawood Gift Card worth up to ₹500"
    ];

    return (
        <div className="bg-gray-100 min-h-screen py-4">
            <div className="max-w-[1400px] mx-auto bg-white shadow-sm rounded-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">

                    {/* LEFT COLUMN - Sticky Images & Buttons */}
                    <div className="w-full md:w-[40%] lg:w-[35%] p-4 sticky top-0 h-fit bg-white">
                        <div className="flex flex-col relative">
                            {/* Main Image Area */}
                            <div className="flex">
                                {/* Vertical Thumbnails (Desktop) */}
                                <div className="hidden md:flex flex-col gap-2 w-16 mr-2 h-[450px] overflow-y-auto scrollbar-hide">
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setSelectedImage(idx)}
                                            className={`w-16 h-16 border-2 cursor-pointer p-1 rounded-sm ${selectedImage === idx ? 'border-[#8b5e3c]' : 'border-gray-200 hover:border-[#8b5e3c]'}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>

                                {/* Main Active Image */}
                                <div className="flex-1 h-[450px] flex items-center justify-center border border-gray-100 relative group">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* Wishlist Heart */}
                                    <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 shadow border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Thumbnails (Below Main) */}
                            <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-16 h-16 flex-shrink-0 border-2 rounded-sm ${selectedImage === idx ? 'border-[#8b5e3c]' : 'border-gray-200'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6">
                                <button className="flex-1 py-4 bg-[#a67c52] hover:bg-[#8b5e3c] text-white font-bold text-base uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 rounded-sm">
                                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                    Add to Cart
                                </button>
                                <button className="flex-1 py-4 bg-[#5c4033] hover:bg-[#3e2b22] text-white font-bold text-base uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 rounded-sm">
                                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Details */}
                    <div className="w-full md:w-[60%] lg:w-[65%] p-4 md:pl-8 border-l border-gray-100 flex-1">

                        {/* Breadcrumbs */}
                        <div className="flex items-center text-xs text-gray-500 mb-2 gap-1">
                            <Link to="/" className="hover:text-[#8b5e3c]">Home</Link>
                            <span>›</span>
                            <Link to="/products" className="hover:text-[#8b5e3c]">Furniture</Link>
                            <span>›</span>
                            <Link to={`/products?category=${product.category}`} className="hover:text-[#8b5e3c]">{product.category}</Link>
                            <span>›</span>
                            <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-lg md:text-xl text-gray-800 font-normal mb-1">
                            {product.name}
                        </h1>

                        {/* Ratings & Tags */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1 bg-[#8b5e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                                {product.rating} <span className="text-[10px]">★</span>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">{product.reviews * 12} Ratings & {product.reviews} Reviews</span>
                            {product.tag && (
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-[21px] opacity-0" />
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 mb-4">
                            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            <span className="text-gray-500 text-base line-through">₹{originalPrice.toLocaleString()}</span>
                            <span className="text-[#8b5e3c] text-base font-bold">{discount}% off</span>
                        </div>

                        {/* Offers */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Available offers</h3>
                            <div className="space-y-2">
                                {offers.map((offer, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                        <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-[18px] h-[18px] mt-0.5 opacity-0" alt="" />
                                        <span><span className="font-medium">{offer.split(' ')[0]} {offer.split(' ')[1]}</span> {offer.substring(offer.indexOf(' ') + 1 + offer.split(' ')[1].length)} <span className="text-[#8b5e3c] cursor-pointer font-medium ml-1">T&C</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-6 border-b border-gray-100 pb-6">
                            <div className="w-32 text-gray-500 text-sm font-medium pt-2">Delivery</div>
                            <div className="flex-1">
                                <div className="flex items-center border-b-2 border-[#8b5e3c] w-full sm:w-64 pb-1 mb-2">
                                    <div className="text-gray-500 text-sm mr-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Delivery Pincode"
                                        className="outline-none text-sm font-medium text-gray-800 flex-1 placeholder:font-normal"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setCheckPincode(true)}
                                        className="text-[#8b5e3c] text-sm font-bold cursor-pointer"
                                    >
                                        Check
                                    </button>
                                </div>
                                {checkPincode && (
                                    <div className="text-sm font-medium">
                                        Delivery by <span className="font-bold">11 PM, Tomorrow</span> | <span className="text-[#8b5e3c] font-bold">Free</span> <span className="line-through text-gray-500 text-xs">₹40</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-6 border-b border-gray-100 pb-6">
                            <div className="w-32 text-gray-500 text-sm font-medium">Highlights</div>
                            <div className="flex-1">
                                <ul className="list-disc pl-4 space-y-1">
                                    {product.features?.map((feature, i) => (
                                        <li key={i} className="text-sm text-gray-800">{feature}</li>
                                    ))}
                                    <li className="text-sm text-gray-800">DIY - Basic assembly to be done with simple tools by the customer, comes with instructions.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Seller */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-6 border-b border-gray-100 pb-6">
                            <div className="w-32 text-gray-500 text-sm font-medium">Seller</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[#8b5e3c] font-medium text-sm">CASAWOOD</span>
                                    <span className="bg-[#8b5e3c] text-white text-[10px] px-1.5 py-0.5 rounded-sm">4.2 ★</span>
                                </div>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li className="text-sm text-gray-800">7 Days Replacement Policy</li>
                                    <li className="text-sm text-gray-800">GST invoice available</li>
                                </ul>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border border-gray-200 rounded-sm mb-6">
                            <div className="px-5 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-medium text-gray-800">Product Description</h2>
                            </div>
                            <div className="p-5 text-sm text-gray-700 leading-relaxed">
                                {product.description}
                                <br /><br />
                                <p>Whether you are looking to revamp your bedroom or living space, this piece from Casawood Furniture is designed to meet your highest standards of comfort and aesthetics. We use only selected materials to ensure longevity and class.</p>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="border border-gray-200 rounded-sm mb-6">
                            <div className="px-5 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-medium text-gray-800">Specifications</h2>
                            </div>
                            <div className="p-5">
                                <div className="mb-4">
                                    <div className="text-sm font-medium text-gray-800 mb-3 uppercase">General</div>
                                    <div className="border border-gray-200 rounded-sm">
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Sales Package</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">1 {product.category.slice(0, -1)}</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Model Number</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">CW-{product.id}-2026</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Secondary Material</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">Solid Wood</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Configuration</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">Standard</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium text-gray-800 mb-3 uppercase">Dimensions</div>
                                    <div className="border border-gray-200 rounded-sm">
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Width</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">180 cm</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Height</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">90 cm</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Depth</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">200 cm</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-200 last:border-b-0">
                                            <div className="p-3 text-sm text-gray-500 col-span-1">Weight</div>
                                            <div className="p-3 text-sm text-gray-800 col-span-2">45 kg</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ratings & Reviews */}
                        <div className="border border-gray-200 rounded-sm mb-6">
                            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-xl font-medium text-gray-800">Ratings & Reviews</h2>
                                <button className="px-5 py-2 bg-white shadow border border-[#8b5e3c] text-sm font-medium text-[#8b5e3c] hover:bg-[#8b5e3c] hover:text-white transition-colors hover:shadow-md">Rate Product</button>
                            </div>
                            <div className="p-6 flex flex-col md:flex-row gap-8">
                                <div className="flex flex-col items-center justify-center w-full md:w-32 border-r-0 md:border-r border-gray-200 pr-0 md:pr-4">
                                    <div className="text-3xl font-medium text-gray-800 flex items-center gap-1">
                                        {product.rating} <span className="text-xl">★</span>
                                    </div>
                                    <div className="text-sm text-gray-500 text-center mt-1">{product.reviews} Reviews</div>
                                </div>

                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map(stars => (
                                        <div key={stars} className="flex items-center gap-4 text-sm">
                                            <div className="w-8 font-medium text-gray-600 flex items-center gap-0.5">{stars} <span className="text-[10px]">★</span></div>
                                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${[1, 2].includes(stars) ? 'bg-[#5c4033]' : 'bg-[#8b5e3c]'}`}
                                                    style={{ width: stars === 5 ? '60%' : stars === 4 ? '25%' : stars === 3 ? '10%' : '5%' }}
                                                ></div>
                                            </div>
                                            <div className="w-8 text-right text-gray-400 text-xs">
                                                {stars === 5 ? '60%' : stars === 4 ? '25%' : stars === 3 ? '10%' : '5%'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
