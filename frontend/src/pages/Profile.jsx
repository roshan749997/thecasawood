import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [isAuthenticated])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
            </div>
        )
    }

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
                <div className="text-center max-w-md px-4">
                    <div className="mb-6">
                        <svg className="w-32 h-32 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Please Login</h2>
                    <p className="text-gray-500 mb-6">Login to view your profile and manage your account</p>
                    <div className="flex gap-3 justify-center">
                        <Link
                            to="/login"
                            className="inline-block px-8 py-3 bg-[#8b5e3c] text-white font-semibold rounded-lg hover:bg-[#70482d] transition-colors shadow-md hover:shadow-lg"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-block px-8 py-3 border-2 border-[#8b5e3c] text-[#8b5e3c] font-semibold rounded-lg hover:bg-[#8b5e3c] hover:text-white transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                    <Link to="/" className="inline-block mt-4 text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-[#8b5e3c] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                                <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Link
                        to="/cart"
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">My Cart</h3>
                                <p className="text-sm text-gray-600">View cart items</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/wishlist"
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">My Wishlist</h3>
                                <p className="text-sm text-gray-600">Saved items</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/address"
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">My Addresses</h3>
                                <p className="text-sm text-gray-600">Manage addresses</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600">Full Name</p>
                                <p className="font-medium text-gray-900">{user?.name || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600">Email Address</p>
                                <p className="font-medium text-gray-900">{user?.email || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600">Phone Number</p>
                                <p className="font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="text-sm text-gray-600">Member Since</p>
                                <p className="font-medium text-gray-900">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
