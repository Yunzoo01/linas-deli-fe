import { useState } from "react";

const StaffPromotion = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [image, setImage] = useState<File | null>(null); // ✅ File 타입 추가
    const [preview, setPreview] = useState<string | null>(null); // ✅ string 타입 추가

    // 이미지 선택 핸들러
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files?.[0] || null;
        
        if (file) { // ✅ file이 존재하는지 확인
            setImage(file);
            setPreview(URL.createObjectURL(file)); // ✅ 타입 오류 해결
            console.log("Selected Image:", file);
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("From:", fromDate, "To:", toDate, "Image:", image);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#C3E2C6]">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg py-[30px] w-[345px]"
            >
                {/* 제목 */}
                <h2 className="text-center text-xl font-bold mb-[27.5px]">Promotion</h2>

                {/* 날짜 선택 */}
                <label className="block text-center text-sm font-semibold text-gray-700 mb-1 ">
                    Date
                </label>
                <div className="flex justify-center items-center gap-2 mb-[19px] text-xs">
                    <input
                        type="date"
                        className="w-[145px] p-2 bg-gray-100 rounded-lg focus:outline-none text-gray-700"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span>—</span>
                    <input
                        type="date"
                        className="w-[145px] p-2 bg-gray-100 rounded-lg focus:outline-none text-gray-700"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                {/* 컨텐츠 (이미지 선택) */}
                <label className="block text-center text-sm font-semibold text-gray-700 mb-1">
                    Contents
                </label>
                <div className="w-full flex justify-center">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <div className="w-[328px] h-40 bg-gray-100 flex justify-center items-center rounded-lg mb-4 overflow-hidden">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 bg-gray-200 px-4 py-2 rounded-lg text-sm">
                                    Image Select
                                </span>
                            )}
                        </div>
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>


                {/* 저장 버튼 */}
                <div className="w-full flex justify-center">
                    <button
                        type="submit"
                        className="w-[95px] h-[27px] bg-[#AD343E] text-white py-[1.5px] rounded-lg font-semibold"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StaffPromotion;