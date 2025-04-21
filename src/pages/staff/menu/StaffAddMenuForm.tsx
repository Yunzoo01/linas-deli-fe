import { useState } from "react";
import StaffPageBanner from "@/components/staff/StaffPageBanner";

const StaffAddMenuForm = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [previewIngredientsImageUrl, setPreviewIngredientsImageUrl] = useState<string | null>(null);
  const [glutenFreeChecked, setGlutenFreeChecked] = useState(false);
  const [lactoseFreeChecked, setLactoseFreeChecked] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImageUrl(null);
    }
  };

  const handleIngredientsImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIngredientsImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewIngredientsImageUrl(null);
    }
  };

  const handleCheckboxChange = (id: string) => {
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
          {/* Form content */}
          {/* Image Upload */}
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
          </div>

          {/* Ingredients Image Upload */}
          <div className="flex gap-6 mb-4 items-start justify-between">
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
          </div>

          {/* Allergy Checkbox */}
          <div className="flex gap-3 items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded-full h-5 w-5 text-green-500"
                id="glutenFree"
                checked={glutenFreeChecked}
                onChange={() => handleCheckboxChange("glutenFree")}
              />
              Gluten Free
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded-full h-5 w-5 text-purple-500"
                id="lactoseFree"
                checked={lactoseFreeChecked}
                onChange={() => handleCheckboxChange("lactoseFree")}
              />
              Lactose Free
            </label>
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Product Description</label>
            <textarea
              className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              rows={3}
            ></textarea>
          </div>

          {/* Serving Suggestion */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Serving suggestion</label>
            <textarea
              className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              rows={2}
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

export default StaffAddMenuForm;
