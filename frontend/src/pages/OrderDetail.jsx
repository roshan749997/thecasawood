import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ordersAPI } from '../services/api'

const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await ordersAPI.getById(id)
                if (response.data.success) {
                    setOrder(response.data.data)
                }
            } catch (error) {
                console.error('Error fetching order:', error)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchOrder()
        }
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
                    <Link to="/" className="text-[#8b5e3c] hover:underline">Return Home</Link>
                </div>
            </div>
        )
    }

    const { shippingAddress, items, paymentInfo, paymentMethod } = order

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                        <p className="text-gray-500 text-sm mt-1">Order ID: {order.orderNumber || order._id}</p>
                    </div>

                    <div className="flex gap-3">
                        {order.paymentStatus === 'paid' ? (
                            <span className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-full text-sm">
                                Paid Successfully
                            </span>
                        ) : (
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-full text-sm">
                                Payment Pending
                            </span>
                        )}
                        <Link to="/products" className="px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#70482d] transition-colors text-sm font-medium">
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Items & Status */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-semibold text-gray-900">Order Items ({items.length})</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {items.map((item, index) => (
                                    <div key={index} className="p-6 flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                                                {item.originalPrice > item.price && (
                                                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Track Order Status */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-gray-900 mb-4">Order Status</h2>
                            {/* Simple Status Steps */}
                            <div className="relative">
                                <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 hidden md:block"></div>
                                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                                    {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((step, i) => {
                                        // Mock status logic
                                        const currentStatus = order.orderStatus || 'confirmed';
                                        // Map status string to index for simplicity
                                        const statusMap = { 'pending': 0, 'confirmed': 0, 'processing': 1, 'shipped': 2, 'delivered': 3 };
                                        const currentIndex = statusMap[currentStatus.toLowerCase()] || 0;
                                        const active = i <= currentIndex;

                                        return (
                                            <div key={step} className="flex md:flex-col items-center gap-3 md:gap-2 bg-white md:bg-transparent p-2 md:p-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${active ? 'bg-[#8b5e3c] border-[#8b5e3c] text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                                                    {active ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                    ) : (
                                                        <span className="text-xs">{i + 1}</span>
                                                    )}
                                                </div>
                                                <span className={`text-sm font-medium ${active ? 'text-[#8b5e3c]' : 'text-gray-500'}`}>{step}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Address & Payment */}
                    <div className="space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Shipping Address</h2>
                            <h3 className="font-medium text-gray-900">{shippingAddress?.name}</h3>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                {shippingAddress?.addressLine1}<br />
                                {shippingAddress?.addressLine2 && <>{shippingAddress.addressLine2}<br /></>}
                                {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.pincode}
                            </p>
                            <p className="text-sm text-gray-600 mt-2 font-medium">
                                Phone: {shippingAddress?.phone}
                            </p>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Payment Details</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Payment Method</span>
                                    <span className="font-medium text-gray-900">{paymentMethod === 'Online' ? 'Razorpay' : paymentMethod}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Payment Status</span>
                                    <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                                        {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                                {paymentInfo?.razorpayPaymentId && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Transaction ID</span>
                                        <span className="font-medium text-gray-900 font-mono text-xs">{paymentInfo.razorpayPaymentId}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Order Summary</h2>
                            <div className="space-y-3 pb-3 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-medium text-green-600">-₹{order.discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery Charges</span>
                                    <span className="font-medium text-gray-900">
                                        {order.deliveryCharges === 0 ? <span className="text-green-600">Free</span> : `₹${order.deliveryCharges}`}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-3">
                                <span className="font-bold text-gray-900">Total Amount</span>
                                <span className="font-bold text-xl text-[#8b5e3c]">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
