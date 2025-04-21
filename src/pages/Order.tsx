import petiteBox from "@/assets/home/order/board1.jpeg";
import mediumBox from "@/assets/home/order/board2.jpeg";
import largeBox from "@/assets/home/order/board3.jpeg";
import PageBanner from "@/components/PageBanner"
import { useNavigate } from "react-router-dom";

const charcuterieItems = [
  {
    platter_id: 1,
    title: "PETITE",
    serves: "serves 3-4 people",
    image: petiteBox, // import된 이미지 사용
  },
  {
    platter_id: 2,
    title: "MEDIUM",
    serves: "serves 4-5 people",
    image: mediumBox, // import된 이미지 사용
  },
  {
    platter_id: 3,
    title: "LARGE",
    serves: "serves 10-12 people",
    image: largeBox, // import된 이미지 사용
  },
];

const Order = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageBanner title="Order" />
      <section className="py-12 px-6 text-center lg:px-30">
        {/* 제목 */}
        <h2 className="text-2xl font-bold text-[#7D4F30] mb-3 tracking-wide lg:text-4xl">
          CHARCUTERIE BOARD
        </h2>
        {/* 설명 */}
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
          "We do not accept same-day orders online. Please call us for assistance."
        </p>

        {/* 박스 리스트 */}
        <div className="flex flex-col items-center space-y-5 lg:space-y-0 lg:flex-row lg:justify-center lg:gap-6 w-full">
          {charcuterieItems.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-lg shadow-lg  bg-white w-full max-w-[400px] lg:max-w-none"
            >
              {/* ✅ 배경 이미지 컨테이너 */}
              <div className="w-full h-30 lg:h-90">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* ✅ 카드 내용 */}
              <div className="absolute -bottom-4 lg:bottom-0 lg:w-full lg:h-2/5 right-0 bg-white/95 shadow-lg rounded-lg p-4 w-40 text-center flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold lg:text-xl">{item.title} BOX</h3>
                <p className="text-xs text-gray-500 lg:text-base">{item.serves}</p>
                {/* 주문 버튼 */}
                <button
                  onClick={() => navigate(`/order/${item.title}`)} // ✅ 주문 버튼 클릭 시 이동
                  className="mt-3 w-full lg:w-2/3 bg-[#AD343E] text-white text-sm lg:text-sm py-1 rounded-3xl flex items-center justify-center gap-1 hover:bg-[#7D3225] transition"
                >
                  Order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Order;