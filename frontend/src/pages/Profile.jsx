import { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const [showSupportForm, setShowSupportForm] = useState(false)
    const [orderFilter, setOrderFilter] = useState('all')

    // Mock user data
    const user = {
        name: 'Roshan Kumar',
        email: 'roshan@example.com',
        phone: '+91 9876543210',
        avatar: 'https://ui-avatars.com/api/?name=Roshan+Kumar&size=200&background=8b5e3c&color=fff&bold=true',
        memberSince: 'January 2024',
        totalOrders: 12,
        totalSpent: 245000,
        accountBalance: 1250,
        loyaltyTier: 'Gold',
        nextTier: 'Platinum',
        tierProgress: 75
    }

    const orders = [
        {
            id: 'ORD-2024-001',
            date: '15 Jan 2024',
            status: 'Delivered',
            total: 45999,
            items: 2,
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100',
            trackingNumber: 'TRK123456789',
            deliveredOn: '18 Jan 2024'
        },
        {
            id: 'ORD-2024-002',
            date: '10 Jan 2024',
            status: 'In Transit',
            total: 52999,
            items: 1,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100',
            trackingNumber: 'TRK987654321',
            expectedDelivery: '25 Jan 2024'
        },
        {
            id: 'ORD-2024-003',
            date: '5 Jan 2024',
            status: 'Delivered',
            total: 38999,
            items: 3,
            image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=100',
            trackingNumber: 'TRK456789123',
            deliveredOn: '8 Jan 2024'
        },
        {
            id: 'ORD-2023-045',
            date: '28 Dec 2023',
            status: 'Cancelled',
            total: 29999,
            items: 1,
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100',
            cancelledOn: '29 Dec 2023'
        }
    ]

    const addresses = [
        {
            id: 1,
            type: 'Home',
            name: 'Roshan Kumar',
            address: 'Flat 301, Sunrise Apartments, MG Road, Andheri West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            phone: '9876543210',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            name: 'Roshan Kumar',
            address: 'Office 5B, Tech Park, Sector 18, Cyber City',
            city: 'Gurugram',
            state: 'Haryana',
            pincode: '110001',
            phone: '9876543210',
            isDefault: false
        }
    ]

    const wishlist = [
        {
            id: 1,
            name: 'Luxury Wooden Dining Table',
            price: 65999,
            originalPrice: 89999,
            image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300',
            inStock: true
        },
        {
            id: 2,
            name: 'Premium Leather Recliner',
            price: 42999,
            originalPrice: 59999,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
            inStock: true
        }
    ]

    const recentActivity = [
        { type: 'order', message: 'Order ORD-2024-001 delivered successfully', time: '2 days ago', icon: '📦' },
        { type: 'wishlist', message: 'Added Luxury Dining Table to wishlist', time: '5 days ago', icon: '❤️' },
        { type: 'review', message: 'Reviewed Premium Wooden Bed', time: '1 week ago', icon: '⭐' },
        { type: 'payment', message: 'Payment successful for ORD-2024-002', time: '2 weeks ago', icon: '💳' }
    ]

    const supportTickets = [
        { id: 'SUP-001', subject: 'Delivery Delay Query', status: 'Resolved', date: '10 Jan 2024' },
        { id: 'SUP-002', subject: 'Product Quality Issue', status: 'Open', date: '15 Jan 2024' }
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-50 border-green-200'
            case 'In Transit': return 'text-blue-600 bg-blue-50 border-blue-200'
            case 'Processing': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getTierColor = (tier) => {
        switch (tier) {
            case 'Platinum': return 'from-gray-400 to-gray-600'
            case 'Gold': return 'from-yellow-400 to-yellow-600'
            case 'Silver': return 'from-gray-300 to-gray-500'
            default: return 'from-amber-700 to-amber-900'
        }
    }

    const filteredOrders = orderFilter === 'all'
        ? orders
        : orders.filter(order => order.status.toLowerCase() === orderFilter.toLowerCase())

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-[#8b5e3c] to-[#5c4033] rounded-lg shadow-lg mb-6 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl"
                                />
                                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
                                    <span className={`px-3 py-1 bg-gradient-to-r ${getTierColor(user.loyaltyTier)} text-white text-xs font-bold rounded-full`}>
                                        {user.loyaltyTier} Member
                                    </span>
                                </div>
                                <div className="space-y-1 text-white/90 mb-3">
                                    <p className="flex items-center justify-center md:justify-start gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {user.email}
                                    </p>
                                    <p className="flex items-center justify-center md:justify-start gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {user.phone}
                                    </p>
                                    <p className="text-sm text-white/70">Member since {user.memberSince}</p>
                                </div>
                                {/* Tier Progress */}
                                <div className="max-w-md mx-auto md:mx-0">
                                    <div className="flex justify-between text-xs text-white/80 mb-1">
                                        <span>{user.tierProgress}% to {user.nextTier}</span>
                                        <span>₹{(50000 - (user.totalSpent % 50000)).toLocaleString()} more</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div className="bg-white rounded-full h-2 transition-all duration-500" style={{ width: `${user.tierProgress}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 md:gap-6 w-full md:w-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-white">{user.totalOrders}</div>
                                    <div className="text-xs md:text-sm text-white/80 mt-1">Orders</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-white">₹{(user.totalSpent / 1000).toFixed(0)}K</div>
                                    <div className="text-xs md:text-sm text-white/80 mt-1">Spent</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-white">₹{user.accountBalance}</div>
                                    <div className="text-xs md:text-sm text-white/80 mt-1">Wallet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
                    <div className="flex border-b border-gray-200 min-w-max">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                            { id: 'orders', label: 'My Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                            { id: 'wishlist', label: 'Wishlist', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                            { id: 'addresses', label: 'Addresses', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                            { id: 'support', label: 'Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
                            { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === tab.id
                                        ? 'text-[#8b5e3c] border-b-2 border-[#8b5e3c] bg-[#8b5e3c]/5'
                                        : 'text-gray-600 hover:text-[#8b5e3c] hover:bg-gray-50'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                                </svg>
                                <span className="whitespace-nowrap">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Quick Actions */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Quick Actions
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Track Order', icon: '📦', link: '#', color: 'blue' },
                                            { label: 'My Wishlist', icon: '❤️', link: '#', color: 'red' },
                                            { label: 'Help Center', icon: '💬', link: '#', color: 'green' },
                                            { label: 'Refer & Earn', icon: '🎁', link: '#', color: 'purple' }
                                        ].map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => action.label === 'My Wishlist' && setActiveTab('wishlist')}
                                                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 hover:border-[#8b5e3c] hover:bg-[#8b5e3c]/5 transition-all group"
                                            >
                                                <span className="text-3xl mb-2">{action.icon}</span>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#8b5e3c] text-center">{action.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Recent Activity
                                    </h2>
                                    <div className="space-y-3">
                                        {recentActivity.map((activity, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                <span className="text-2xl">{activity.icon}</span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Account Balance */}
                                <div className="bg-gradient-to-br from-[#8b5e3c] to-[#5c4033] rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold">Wallet Balance</h3>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-4xl font-bold mb-2">₹{user.accountBalance.toLocaleString()}</div>
                                    <p className="text-white/80 text-sm mb-4">Available for purchases</p>
                                    <button className="w-full bg-white text-[#8b5e3c] font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        Add Money
                                    </button>
                                </div>

                                {/* Refer & Earn */}
                                <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-[#8b5e3c]">
                                    <div className="text-center">
                                        <div className="text-4xl mb-3">🎁</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Refer & Earn</h3>
                                        <p className="text-sm text-gray-600 mb-4">Invite friends and earn ₹500 for each successful referral</p>
                                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                                            <code className="text-sm font-mono text-[#8b5e3c] font-bold">ROSHAN2024</code>
                                        </div>
                                        <button className="w-full bg-[#8b5e3c] text-white font-semibold py-2 rounded-lg hover:bg-[#70482d] transition-colors">
                                            Share Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-gray-900">My Orders ({orders.length})</h2>
                                <div className="flex gap-2 flex-wrap">
                                    {['all', 'delivered', 'in transit', 'cancelled'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setOrderFilter(filter)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${orderFilter === filter
                                                    ? 'bg-[#8b5e3c] text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <div key={order.id} className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <img src={order.image} alt="Order" className="w-24 h-24 rounded-lg object-cover" />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-lg">{order.id}</h3>
                                                        <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                                                    </div>
                                                    <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Items</p>
                                                        <p className="font-semibold text-gray-900">{order.items}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Total Amount</p>
                                                        <p className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Tracking Number</p>
                                                        <p className="font-semibold text-gray-900 text-xs">{order.trackingNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            {order.status === 'Delivered' ? 'Delivered On' :
                                                                order.status === 'Cancelled' ? 'Cancelled On' : 'Expected Delivery'}
                                                        </p>
                                                        <p className="font-semibold text-gray-900 text-xs">
                                                            {order.deliveredOn || order.expectedDelivery || order.cancelledOn}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {order.status !== 'Cancelled' && (
                                                        <button className="px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium text-sm">
                                                            Track Order
                                                        </button>
                                                    )}
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                                                        View Details
                                                    </button>
                                                    {order.status === 'Delivered' && (
                                                        <>
                                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                                                                Download Invoice
                                                            </button>
                                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                                                                Write Review
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">No orders found for this filter</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === 'wishlist' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist ({wishlist.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                                <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </button>
                                            {item.inStock && (
                                                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                    In Stock
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                                                <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                <span className="text-xs text-green-600 font-bold">
                                                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                                </span>
                                            </div>
                                            <button className="w-full py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === 'addresses' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                                <Link to="/address" className="px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium text-sm flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Address
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-[#8b5e3c] transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded uppercase">
                                                    {addr.type}
                                                </span>
                                                {addr.isDefault && (
                                                    <span className="px-2 py-1 bg-[#8b5e3c] text-white text-xs font-medium rounded">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{addr.name}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
                                        <p className="text-sm text-gray-600 mb-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p className="text-sm text-gray-600 mb-4">Phone: {addr.phone}</p>
                                        <div className="flex gap-3">
                                            <button className="text-sm text-[#8b5e3c] font-medium hover:text-[#70482d]">EDIT</button>
                                            <button className="text-sm text-gray-600 font-medium hover:text-red-500">REMOVE</button>
                                            {!addr.isDefault && (
                                                <button className="text-sm text-gray-600 font-medium hover:text-[#8b5e3c]">SET AS DEFAULT</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Support Tab */}
                    {activeTab === 'support' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Support Tickets */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Support Tickets</h2>
                                    <button
                                        onClick={() => setShowSupportForm(!showSupportForm)}
                                        className="px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium text-sm"
                                    >
                                        New Ticket
                                    </button>
                                </div>
                                {showSupportForm && (
                                    <div className="mb-6 p-4 border-2 border-[#8b5e3c] rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">Create Support Ticket</h3>
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Subject"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent"
                                            />
                                            <textarea
                                                placeholder="Describe your issue..."
                                                rows="4"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <button className="flex-1 px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium">
                                                    Submit
                                                </button>
                                                <button
                                                    onClick={() => setShowSupportForm(false)}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {supportTickets.map((ticket) => (
                                        <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                                                    <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                                                </div>
                                                <span className={`text-xs font-medium px-2 py-1 rounded ${ticket.status === 'Resolved'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {ticket.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">{ticket.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Help Resources */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Help</h2>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'Track Your Order', icon: '📦' },
                                            { title: 'Return & Refund Policy', icon: '↩️' },
                                            { title: 'Payment Methods', icon: '💳' },
                                            { title: 'Shipping Information', icon: '🚚' },
                                            { title: 'FAQs', icon: '❓' }
                                        ].map((help, idx) => (
                                            <button
                                                key={idx}
                                                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#8b5e3c] hover:bg-[#8b5e3c]/5 transition-all text-left"
                                            >
                                                <span className="text-2xl">{help.icon}</span>
                                                <span className="font-medium text-gray-900">{help.title}</span>
                                                <svg className="w-5 h-5 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                                    <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
                                    <p className="text-white/90 text-sm mb-4">Our customer support team is available 24/7</p>
                                    <div className="space-y-2">
                                        <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-white/80">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +91 9876543210
                                        </a>
                                        <a href="mailto:support@casawood.com" className="flex items-center gap-2 text-white hover:text-white/80">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            support@casawood.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input type="text" defaultValue={user.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input type="tel" defaultValue={user.phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent" />
                                        </div>
                                    </div>
                                    <button className="mt-4 px-6 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors font-medium">
                                        Save Changes
                                    </button>
                                </div>

                                {/* Security */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Security
                                    </h3>
                                    <div className="space-y-3">
                                        <button className="w-full md:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                            Change Password
                                        </button>
                                        <button className="w-full md:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium ml-0 md:ml-3">
                                            Enable Two-Factor Authentication
                                        </button>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        Notifications
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Order Updates', desc: 'Get notified about your order status', checked: true },
                                            { label: 'Promotional Emails', desc: 'Receive offers and discounts', checked: true },
                                            { label: 'SMS Notifications', desc: 'Get SMS alerts for important updates', checked: false },
                                            { label: 'WhatsApp Updates', desc: 'Receive order updates on WhatsApp', checked: true }
                                        ].map((item, idx) => (
                                            <label key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                                </div>
                                                <input type="checkbox" defaultChecked={item.checked} className="form-checkbox h-5 w-5 text-[#8b5e3c] rounded focus:ring-[#8b5e3c]" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Privacy */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#8b5e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Privacy
                                    </h3>
                                    <div className="space-y-2">
                                        <button className="text-sm text-[#8b5e3c] font-medium hover:text-[#70482d]">Download My Data</button>
                                        <span className="text-gray-400 mx-2">•</span>
                                        <button className="text-sm text-[#8b5e3c] font-medium hover:text-[#70482d]">Privacy Policy</button>
                                        <span className="text-gray-400 mx-2">•</span>
                                        <button className="text-sm text-[#8b5e3c] font-medium hover:text-[#70482d]">Terms of Service</button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div>
                                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Danger Zone
                                    </h3>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <p className="text-sm text-red-800 mb-3">Once you delete your account, there is no going back. Please be certain.</p>
                                        <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
