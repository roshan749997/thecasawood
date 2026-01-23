  import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const banners = [
    {
      desktop: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769079901/Grey_Modern_Furniture_Sofa_For_sale_Banner_1920_x_600_mm_yljnle.svg",
      mobile: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769085676/White_Modern_Minimalist_Minimalist_Furniture_Instagram_Post_-_RA364_1080_x_1080_px_ap7m3a.svg",
      alt: "Modern Furniture Sofa Banner"
    },
    {
      desktop: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769081274/Brown_Minimalist_Furniture_Banner_Landscape_1920_x_600_mm_dwd9gl.svg",
      mobile: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769086805/Beige_Modern_Luxury_Real_Estate_Instagram_Post_1080_x_1080_px_iessfn.png",
      alt: "Brown Minimalist Furniture Banner"
    }
  ];

  const len = banners.length;

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = () => {
    if (len <= 1) return;
    stop();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 4000);
  };

  useEffect(() => {
    start();
    return stop;
  }, [len]);

  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  if (!len) return null;

  return (
    <section className="w-full m-0 p-0">
      {/* Desktop slider */}
      <div className="hidden md:block relative overflow-hidden">
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={stop}
          onMouseLeave={start}
        >
          {banners.map((s, i) => (
            <img
              key={i}
              src={s.desktop}
              alt={s.alt || `Banner ${i + 1}`}
              className="w-full h-auto object-cover block shrink-0 grow-0 basis-full select-none"
              loading="eager"
              draggable="false"
              onError={(e) => {
                e.currentTarget.src = s.fallback || s.desktop;
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#8b5e3c] hover:text-white text-[#8b5e3c] rounded-full w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-10 touch-manipulation"
          aria-label="Previous"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#8b5e3c] hover:text-white text-[#8b5e3c] rounded-full w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-10 touch-manipulation"
          aria-label="Next"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 sm:gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`${i === index ? 'w-6 sm:w-8 bg-[#8b5e3c]' : 'w-3 sm:w-4 bg-black/30'} h-1.5 sm:h-2 rounded-full transition-all duration-300 hover:bg-[#8b5e3c]/70 active:scale-90 touch-manipulation`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile single image */}
      <div className="md:hidden block w-full">
        <img
          src={banners[index]?.mobile || banners[0]?.mobile}
          alt={banners[index]?.alt || banners[0]?.alt || "Banner"}
          className="w-full h-[350px] sm:h-[450px] object-cover block select-none"
          loading="lazy"
          draggable="false"
        />
      </div>
    </section>
  );
};

export default HeroSection;
