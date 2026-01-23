import React from 'react';
import { Link } from 'react-router-dom';

const PopularCategories = () => {
    const categories = [
        {
            id: 1,
            title: 'Beds',
            image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077652/Beds_oz8l1m.jpg',
            link: 'Beds'
        },
        {
            id: 2,
            title: 'Coffee & Center Tables',
            image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077664/Coffee_Center_table_xoiusz.jpg',
            link: 'Tables'
        },
        {
            id: 3,
            title: 'Dining Tables',
            image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077674/Dining_table_rcrp6c.jpg',
            link: 'Dining'
        },
        {
            id: 4,
            title: 'Leatherette Sofas',
            image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077688/leatherette_sofa_gxjoil.jpg',
            link: 'Sofas'
        },
        {
            id: 5,
            title: 'Polyester Fabric Sofas',
            image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769077701/Polyster_sofa_q6wpar.jpg',
            link: 'Sofas'
        },
    ];

    return (
        <section className="w-full bg-white py-12 sm:py-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-gray-900 mb-4">
                        Popular Categories
                    </h2>
                    <div className="w-16 sm:w-20 h-0.5 bg-amber-300 mx-auto"></div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                    {categories.map((category) => (
                        <Link
                            to={`/products?category=${category.link}`}
                            key={category.id}
                            className="group cursor-pointer flex flex-col items-center"
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-sm sm:text-base font-medium text-gray-700 text-center group-hover:text-[#8b5e3c] transition-colors">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
