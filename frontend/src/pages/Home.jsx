import HeroSection from '../components/HeroSection'
import PopularCategories from '../components/PopularCategories'
import FeaturedCollection from '../components/FeaturedCollection'
import StyleInspiration from '../components/StyleInspiration'


import InteriorSolutions from '../components/InteriorSolutions'
import ModernLuxury from '../components/ModernLuxury'
import CraftsmanshipSection from '../components/CraftsmanshipSection'
import TestimonialSection from '../components/TestimonialSection'
import PoliciesSection from '../components/PoliciesSection'

const Home = () => {
    return (
        <>
            <HeroSection />
            <PoliciesSection />
            <PopularCategories />
            <StyleInspiration />
            <FeaturedCollection />

            <InteriorSolutions />
            <ModernLuxury />
            <CraftsmanshipSection />
            <TestimonialSection />


        </>
    )
}

export default Home
