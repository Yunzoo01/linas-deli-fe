import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 640);
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <div className="relative w-full h-[40rem] sm:h-[50rem]">
            {/* Swiper - 배경 이미지만 변경됨 */}
            <Swiper
                modules={isMobile ? [Pagination, Autoplay] : [Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={isMobile ? { el: '.swiper-pagination', clickable: true, type: 'bullets' } : false}
                navigation={!isMobile ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } : false}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="relative w-full h-[40rem] sm:h-[50rem] z-0"
            >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <SwiperSlide key={num}>
                        <div
                            className="w-full h-[40rem] sm:h-[50rem] bg-cover bg-center"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, ${num === 2 || num === 4 ? 0.3 : 0.5}), rgba(0, 0, 0, ${num === 2 || num === 4 ? 0.3 : 0.5})), url('/Banner/banner${num}.jpeg')`,
                            }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Navigation 버튼 추가 */}
            {!isMobile && (
                <>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </>
            )}


            {/* 텍스트 (고정된 상태) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white gap-2 sm:gap-5">
                <h1 className="text-4xl font-bold mt-10 sm:mt-0 sm:text-8xl">Lina’s Deli</h1>
                <button className="sm:hidden mt-4 px-6 py-2 bg-white text-sm sm:text- text-black rounded-lg font-medium">
                    <Link to="/order">ORDER</Link>
                </button>
                <p className="mt-2 text-base sm:text-3xl text-center px-10 sm:px-30">
                    At Lina’s, everyone is family, and you’ll find the friendliest service in the city.
                </p>
                <button className="hidden sm:block mt-4 px-6 py-2 bg-white text-sm sm:text-3xl text-black rounded-lg font-medium">
                    <Link to="/order">ORDER</Link>
                </button>
            </div>

            {/* Swiper 스타일 수정 */}
            <style>
                {`
                    .swiper-button-next::after, .swiper-button-prev::after {
                        color: white !important;
                        font-size: 2rem !important;
                    }
                    .swiper-button-next, .swiper-button-prev {
                        z-index: 50 !important;
                        position: absolute !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Hero;