import HeroSection from '../components/HeroSection'
import PopularCategories from '../components/PopularCategories'
import FeaturedCollection from '../components/FeaturedCollection'
import PoliciesSection from '../components/PoliciesSection'

const Home = () => {
    return (
        <>
            <HeroSection />
            <PoliciesSection />
            <PopularCategories />
            <FeaturedCollection />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                        Welcome to Casawood Furniture
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Your content goes here
                    </p>
                </div>
            </main>
        </>
    )
}

export default Home
