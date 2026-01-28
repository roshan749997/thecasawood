import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MobileBottomNav from './components/MobileBottomNav'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Address = lazy(() => import('./pages/Address'))

const OrderDetail = lazy(() => import('./pages/OrderDetail'))
const Profile = lazy(() => import('./pages/Profile'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))

// Loading component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
  </div>
)

const AppContent = () => {
  const location = useLocation() // Now this hook works because it's inside Router
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${!isAuthPage ? 'pb-16 lg:pb-0' : ''}`}>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />

          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
        </Routes>
      </Suspense>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileBottomNav />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
