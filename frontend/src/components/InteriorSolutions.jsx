import React from 'react';
import { Link } from 'react-router-dom';

const InteriorSolutions = () => {
    return (
        <section className="w-full bg-[#f9f5f1] py-16 sm:py-24">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Content Side */}
                        <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
                            <span className="text-[#8b5e3c] font-bold tracking-widest uppercase mb-4">Space Saving Solutions</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                                Smart Design for <br />
                                <span className="text-[#5c4033] italic">Modern Living</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Maximizing space doesn't mean compromising on style. Explore our range of multifunctional furniture designed for urban apartments. From storage beds to extendable dining tables, we have intelligent solutions for every corner.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#f4f1ee] flex items-center justify-center text-[#8b5e3c] flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Hydraulic Storage</h4>
                                        <p className="text-sm text-gray-500">Effortless lifting mechanism for ample under-bed storage.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#f4f1ee] flex items-center justify-center text-[#8b5e3c] flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Modular Units</h4>
                                        <p className="text-sm text-gray-500">Customizable shelving and wardrobes to fit your walls.</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/products" className="inline-block px-8 py-3 bg-[#5c4033] text-white font-medium hover:bg-[#8b5e3c] transition-colors rounded-sm text-center w-fit">
                                Explore Smart Solutions
                            </Link>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-[400px] lg:h-auto bg-gray-50 flex items-center justify-center p-8">
                            <img
                                src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769155788/Grey_3D_Wall_Art_Frame_Instagram_Post_fasv3p.svg"
                                alt="Smart Storage Bed"
                                className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg"
                            />
                            <div className="absolute bottom-6 left-6 bg-white p-3 rounded-sm shadow-md max-w-xs">
                                <p className="text-xs font-bold text-[#8b5e3c] uppercase mb-1">Featured</p>
                                <p className="font-serif text-gray-900 text-sm">The Casawood Hydraulic Bed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteriorSolutions;
