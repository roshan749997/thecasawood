import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addressesAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Address = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [editingAddress, setEditingAddress] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch addresses from API
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
            return
        }

        const fetchAddresses = async () => {
            try {
                setLoading(true)
                const response = await addressesAPI.getAll()
                if (response.data.success) {
                    setAddresses(response.data.data || [])
                }
            } catch (error) {
                console.error('Error fetching addresses:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAddresses()
    }, [isAuthenticated, navigate])

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        type: 'Home'
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingAddress) {
                const response = await addressesAPI.update(editingAddress._id || editingAddress.id, formData)
                if (response.data.success) {
                    setAddresses(addresses.map(addr =>
                        addr._id === editingAddress._id ? response.data.data : addr
                    ))
                    setEditingAddress(null)
                }
            } else {
                const response = await addressesAPI.create({
                    ...formData,
                    addressLine1: formData.address,
                    addressLine2: formData.locality
                })
                if (response.data.success) {
                    setAddresses([...addresses, response.data.data])
                }
            }
            setFormData({
                name: '',
                phone: '',
                pincode: '',
                address: '',
                locality: '',
                city: '',
                state: '',
                type: 'Home'
            })
            setShowAddressForm(false)
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to save address')
        }
    }

    const handleEdit = (address) => {
        setFormData({
            name: address.name,
            phone: address.phone,
            pincode: address.pincode,
            address: address.addressLine1 || address.address,
            locality: address.addressLine2 || address.locality || '',
            city: address.city,
            state: address.state,
            type: address.type
        })
        setEditingAddress(address)
        setShowAddressForm(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) {
            return
        }

        try {
            await addressesAPI.delete(id)
            setAddresses(addresses.filter(addr => (addr._id || addr.id) !== id))
            if (selectedAddress === id) setSelectedAddress(null)
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete address')
        }
    }

    const handleContinue = () => {
        if (selectedAddress) {
            navigate('/payment')
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen py-4 md:py-6">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                    <Link to="/cart" className="hover:text-[#8b5e3c]">Cart</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">Delivery Address</span>
                    <span>›</span>
                    <span className="text-gray-400">Payment</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Column - Addresses */}
                    <div className="flex-1">
                        {/* Add New Address Button */}
                        {!showAddressForm && (
                            <div className="bg-white rounded-sm shadow-sm mb-4">
                                <button
                                    onClick={() => setShowAddressForm(true)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#8b5e3c] rounded-full flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <span className="text-base font-semibold text-[#8b5e3c] uppercase tracking-wide">
                                            Add a New Address
                                        </span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Address Form */}
                        {showAddressForm && (
                            <div className="bg-white rounded-sm shadow-sm mb-4">
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setShowAddressForm(false)
                                            setEditingAddress(null)
                                            setFormData({
                                                name: '',
                                                phone: '',
                                                pincode: '',
                                                address: '',
                                                locality: '',
                                                city: '',
                                                state: '',
                                                type: 'Home'
                                            })
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                maxLength="10"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="10-digit mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pincode <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                required
                                                maxLength="6"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="6-digit pincode"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Locality <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="locality"
                                                value={formData.locality}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="Locality/Area"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address (House No, Building, Street) <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            rows="3"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent resize-none"
                                            placeholder="Enter complete address"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City/District <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="City"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                                placeholder="State"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Address Type
                                        </label>
                                        <div className="flex gap-4">
                                            {['Home', 'Work'].map((type) => (
                                                <label key={type} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value={type}
                                                        checked={formData.type === type}
                                                        onChange={handleInputChange}
                                                        className="form-radio h-4 w-4 text-[#8b5e3c] border-gray-300 focus:ring-[#8b5e3c]"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 bg-[#5c4033] text-white font-bold uppercase rounded-sm hover:bg-[#3e2b22] transition-colors shadow-md"
                                        >
                                            {editingAddress ? 'Update Address' : 'Save Address'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddressForm(false)
                                                setEditingAddress(null)
                                            }}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Saved Addresses */}
                        {addresses.length > 0 && !showAddressForm && (
                            <div className="bg-white rounded-sm shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Select Delivery Address
                                    </h2>
                                </div>

                                {loading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 mb-4">No addresses saved</p>
                                        <button
                                            onClick={() => setShowAddressForm(true)}
                                            className="px-6 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d]"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {addresses.map((address) => {
                                            const addressId = address._id || address.id
                                            return (
                                                <div
                                                    key={addressId}
                                                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${selectedAddress === addressId ? 'bg-[#8b5e3c]/5 border-l-4 border-[#8b5e3c]' : ''
                                                        }`}
                                                    onClick={() => setSelectedAddress(addressId)}
                                                >
                                                    <div className="flex gap-4">
                                                        {/* Radio Button */}
                                                        <div className="flex-shrink-0 pt-1">
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === addressId ? 'border-[#8b5e3c]' : 'border-gray-300'
                                                                }`}>
                                                                {selectedAddress === addressId && (
                                                                    <div className="w-3 h-3 rounded-full bg-[#8b5e3c]"></div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Address Details */}
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <h3 className="text-base font-semibold text-gray-900">{address.name}</h3>
                                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded uppercase">
                                                                        {address.type}
                                                                    </span>
                                                                    {address.isDefault && (
                                                                        <span className="px-2 py-0.5 bg-[#8b5e3c] text-white text-xs font-medium rounded">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <p className="text-sm text-gray-700 mb-1">{address.addressLine1 || address.address}</p>
                                                            {address.addressLine2 && (
                                                                <p className="text-sm text-gray-700 mb-1">{address.addressLine2}</p>
                                                            )}
                                                            <p className="text-sm text-gray-700 mb-2">
                                                                {address.city}, {address.state} - {address.pincode}
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-4">
                                                                Mobile: <span className="font-medium text-gray-900">{address.phone}</span>
                                                            </p>

                                                            {/* Action Buttons */}
                                                            <div className="flex gap-4">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleEdit(address)
                                                                    }}
                                                                    className="text-sm font-medium text-[#8b5e3c] hover:text-[#70482d] transition-colors"
                                                                >
                                                                    EDIT
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleDelete(addressId)
                                                                    }}
                                                                    className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors"
                                                                >
                                                                    REMOVE
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* Deliver Here Button - Mobile */}
                                <div className="lg:hidden p-4 border-t border-gray-200">
                                    <button
                                        onClick={handleContinue}
                                        disabled={!selectedAddress}
                                        className={`w-full py-3 font-bold uppercase rounded-sm transition-colors shadow-md ${selectedAddress
                                            ? 'bg-[#5c4033] text-white hover:bg-[#3e2b22]'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Deliver Here
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Order Summary (Sticky) */}
                    <div className="lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-sm shadow-sm sticky top-20">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">Order Summary</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between text-base">
                                    <span className="text-gray-700">Items (3)</span>
                                    <span className="font-medium text-gray-900">₹98,998</span>
                                </div>

                                <div className="flex justify-between text-base">
                                    <span className="text-gray-700">Delivery</span>
                                    <span className="font-medium text-[#8b5e3c]">FREE</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-gray-900">Total Amount</span>
                                        <span className="text-gray-900">₹98,998</span>
                                    </div>
                                </div>

                                <div className="text-sm text-[#8b5e3c] font-medium bg-[#8b5e3c]/10 p-3 rounded-sm">
                                    You saved ₹41,001 on this order
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={handleContinue}
                                    disabled={!selectedAddress}
                                    className={`w-full py-3 font-bold uppercase rounded-sm transition-colors shadow-md hover:shadow-lg ${selectedAddress
                                        ? 'bg-[#5c4033] text-white hover:bg-[#3e2b22]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
