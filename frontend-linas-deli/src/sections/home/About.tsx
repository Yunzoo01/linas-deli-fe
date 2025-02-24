const About = () => {
    return (
        <section className="h-auto mx-auto sm:h-auto sm:px-20 sm:pt-16 sm:pb-40 sm:bg-[#FFFAEF]">
            {/* 제목 */}
            <h2 className="sm:text-5xl text-2xl font-bold px-[1.5rem] my-[2.9rem] sm:text-center sm:mb-12">About</h2>

            {/* 메인 컨텐츠 */}
            <div className=" relative flex flex-col sm:flex-row items-center gap-12 gap-20">
                {/* 이미지 + 카드 */}
                <div className="relative  w-full h-[24rem] rounded-tr-lg rounded-br-lg sm:rounded-br-xl">
                    <img
                        src="/Banner/banner1.jpeg"
                        alt="Delicious food"
                        className="w-full h-full object-cover transform -translate-x-2/5 sm:translate-x-0 shadow-lg rounded-tr-lg rounded-br-lg sm:rounded-br-xl"
                    />
                    {/* 카드 UI */}
                    <div className="z-50 flex flex-col gap-3 sm:gap-5 absolute sm:-right-8 sm:-bottom-8 right-7 bottom-6 bg-white p-6 sm:p-8 rounded-lg shadow-lg w-[75%] sm:w-[80%]">
                        <h3 className="text-base sm:text-2xl font-semibold mb-2 sm:mb-4">Come and visit us</h3>
                        <p className="flex text-xs sm:text-lg items-center gap-2 text-gray-600">
                            <img src="/Icon/Outline/phone.svg" alt="Phone" className="w-5 h-5 sm:w-8 sm:h-8" />
                            (604)-688-8881
                        </p>
                        <p className="flex text-xs sm:text-lg items-center gap-2 text-gray-600">
                            <img src="/Icon/Outline/mail.svg" alt="Email" className="w-5 h-5 sm:w-8 sm:h-8" />
                            linasdeli@gmail.com
                        </p>
                        <p className="flex text-xs sm:text-lg items-start gap-2 text-gray-600">
                            <img src="/Icon/Outline/location-marker.svg" alt="Location" className="w-5 h-5 sm:w-8 sm:h-8 flex-shrink-0 mt-1" />
                            1689 Johnston St, <br />
                            Vancouver, BC V6H 3S2
                        </p>
                    </div>
                </div>

                {/* 텍스트 설명 */}
                <div className="flex w-full bg-[#FFFAEF] flex-col justify-center gap-4 px-[1.5rem] py-12 -mt-30 h-[20rem]">
                    <h3 className="text-black mt-16 font-pretendard text-[1.25rem] sm:text-4xl sm:mb-4 font-medium leading-[1.75rem] sm:leading-none">
                        We provide healthy <br></br>food for your family.
                    </h3>
                    <p className="text-black font-pretendard text-[0.6875rem] sm:text-xl font-light leading-[1.10081rem] sm:leading-snug">
                        At Lina’s, everyone is family, and you’ll find the friendliest
                        service in the city. Whether you are planning a gourmet wine tasting
                        or looking for simple snacks for the big game, Lina’s has a little
                        something for every palate and every budget.
                    </p>
                </div>
            </div>
        </section >
    );
};

export default About;