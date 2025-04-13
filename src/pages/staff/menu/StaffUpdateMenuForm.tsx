import React, { useState } from "react";
import StaffPageBanner from "../../../components/staff/StaffPageBanner";

const StaffUpdateMenuForm = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [uploadedIngredientsImage, setUploadedIngredientsImage] = useState(null);
  const [previewIngredientsImageUrl, setPreviewIngredientsImageUrl] = useState(null);
  const [glutenFreeChecked, setGlutenFreeChecked] = useState(false);
  const [lactoseFreeChecked, setLactoseFreeChecked] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
      setPreviewImageUrl(null);
    }
  };

  const handleIngredientsImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedIngredientsImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIngredientsImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedIngredientsImage(null);
      setPreviewIngredientsImageUrl(null);
    }
  };

  const handleCheckboxChange = (id) => {
    switch (id) {
      case "glutenFree":
        setGlutenFreeChecked(!glutenFreeChecked);
        break;
      case "lactoseFree":
        setLactoseFreeChecked(!lactoseFreeChecked);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <StaffPageBanner title="Menu" />
      <form className="bg-[#C3E2C6] min-h-screen py-10 px-4 flex justify-center">
        <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
          <div className="flex mb-10">
            <h1 className="text-2xl font-bold mr-3">Create Post</h1>
            <div className="flex">
              <select
                className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              >
                <option value="">Select Category</option>
                <option selected value="cheese">Cheese</option>
                <option value="meat">Meat</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          {/* Row 1: Image, Product Name, Supplier */}
          <div className="flex gap-6 mb-4">
            <div className="w-36 h-36 rounded flex flex-col items-start justify-center">
              {previewImageUrl ? (
                <img
                  src={previewImageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded mb-1"
                />
              ) : (
                <div className="w-full h-full flex items-center bg-gray-300 justify-center text-gray-500 text-sm">
                  No image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer px-2 py-1 text-xs bg-gray-300 rounded mt-1"
              >
                image upload
              </label>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-semibold mb-1">Product name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Supplier</label>
                <select className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm">
                  <option>Bosa</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Price Type */}
          <div className="flex mb-4 items-center">
            <label className="block text-sm font-semibold mb-1 mr-3">Price Type</label>
            <div className="flex gap-3">
              <label className="text-sm">
                <input type="radio" name="priceType" defaultChecked className="mr-1" />
                Whole Wheel
              </label>
              <label className="text-sm">
                <input type="radio" name="priceType" className="mr-1" />
                Pre-Pack
              </label>
            </div>
          </div>

          {/* Row 3: Detailed Information */}
          <div className="mb-4 flex flex-col lg:flex-row">
            <div className="flex-1 mr-4">
              <div className="flex flex-col md:flex-row item-start md:items-center mb-2">
                <label className="text-sm mr-3 w-[75px]">Cost / Kg</label>
                <input
                  type="text"
                  className="w-full lg:w-[200px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                />
              </div>
              <div className="flex flex-col md:flex-row item-start md:items-center mb-2">
                <label className="text-sm mr-3 w-[75px]">Sale price</label>
                <input
                  type="text"
                  className="w-full lg:w-[200px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                />
              </div>
              <div className="flex flex-col md:flex-row item-start md:items-center mb-2">
                <label className="text-sm mr-3 w-[75px]">PLU</label>
                <input
                  type="text"
                  className="w-full lg:w-[200px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label className="block text-sm font-semibold mb-1">Source Animal</label>
                <select className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm">
                  <option>Cow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Categories</label>
                <select className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm">
                  <option>Cheese</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold">Pasteurized</label>
                <input type="checkbox" checked className="w-4 h-4" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Country of origin</label>
                <select className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm">
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </div>

{/* Row 4: Ingredients and Allergy Mark */}
<div className="flex gap-6 mb-6 items-start justify-between">
            <div>
              <label className="block text-sm font-semibold mb-1">Ingredients</label>
              <div className="w-36 h-28 bg-gray-200 rounded mb-2 flex items-center justify-center">
                {previewIngredientsImageUrl ? (
                  <img
                    src={previewIngredientsImageUrl}
                    alt="ingredients"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="ingredients-image-upload"
                onChange={handleIngredientsImageUpload}
              />
              <label
                htmlFor="ingredients-image-upload"
                className="cursor-pointer px-2 py-1 text-xs bg-gray-300 rounded"
              >
                image upload
              </label>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="font-semibold text-sm">Allergy Mark (Option)</p>
              <div className="flex gap-3 items-center">
                <label className="flex items-center">
                  <img
                    src="/Icon/allergy/icon_glutenfree.png"
                    alt="Gluten Free"
                    className="w-6 h-6 mr-2"
                  />
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full h-5 w-5 text-green-500"
                    id="glutenFree"
                    checked={glutenFreeChecked}
                    onChange={() => handleCheckboxChange("glutenFree")}
                  />
                </label>
                <label className="flex items-center">
                  <img
                    src="/Icon/allergy/icon_lactosefree.png"
                    alt="Lactose Free"
                    className="w-6 h-6 mr-2"
                  />
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full h-5 w-5 text-purple-500"
                    id="lactoseFree"
                    checked={lactoseFreeChecked}
                    onChange={() => handleCheckboxChange("lactoseFree")}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Row 5: Product Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Product Description</label>
            <textarea
              className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              rows="3"
            ></textarea>
          </div>

          {/* Row 6: Serving Suggestion */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Serving suggestion</label>
            <textarea
              className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              rows="2"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#AD343E] text-white px-4 py-2 rounded-md text-sm">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StaffUpdateMenuForm;