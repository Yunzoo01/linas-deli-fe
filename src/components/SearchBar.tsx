import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // 여기에서 검색 로직을 구현합니다 (백엔드 연동 등).
    console.log(`검색어: ${searchTerm}`);
  };

  const handleClearInput = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white shadow-md mx-6">
      <div className="pl-3 pr-2">
        {/* 돋보기 아이콘 대체 */}
        <image className="block w-10 h-10" src="/Icon/icon_search.svg"/>
      </div>
      <input
        type="text"
        className="flex-grow outline-none"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button
          className="pr-3 pl-2 focus:outline-none"
          onClick={handleClearInput}
        >
          {/* 닫기 아이콘 대체 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;