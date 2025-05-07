import { useEffect, useState } from "react";
import api from "@/api/axios";
import StaffPageBanner from "@/components/staff/StaffPageBanner";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ProductFormResponseDTO, SupplierDTO, CategoryDTO, AnimalDTO, CountryDTO } from "@/type";

const StaffAddMenuForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormResponseDTO | null>(null);
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [animals, setAnimals] = useState<AnimalDTO[]>([]);
  const [countries, setCountries] = useState<CountryDTO[]>([]);

  const [productName, setProductName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

  const [priceType, setPriceType] = useState<"W" | "U">("W");
  const [supplierPrice, setSupplierPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [plu, setPlu] = useState("");
  const [pasteurized, setPasteurized] = useState(false);

  const [glutenFreeChecked, setGlutenFreeChecked] = useState(false);
  const [lactoseFreeChecked, setLactoseFreeChecked] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [previewIngredientsImageUrl, setPreviewIngredientsImageUrl] = useState<string | null>(null);

  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [ingredientsImageFile, setIngredientsImageFile] = useState<File | null>(null);


  const [description, setDescription] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    if (id) fetchProductForm(Number(id));
  }, [id]);

  useEffect(() => {
    if (formData) {
      setProductName(formData.productName);
      setSelectedCategoryId(formData.categoryId);
      setSelectedSupplierId(formData.supplierId);
      setSelectedAnimalId(formData.animalId);
      setSelectedCountryId(formData.originId);
      setPriceType(formData.priceType as "W" | "U");
      setSupplierPrice(formData.supplierPrice.toString());
      setSalePrice(formData.salePrice.toString());
      setPlu(formData.plu.toString());
      setPasteurized(formData.pasteurized);
      setGlutenFreeChecked(formData.allergies.includes("G"));
      setLactoseFreeChecked(formData.allergies.includes("L"));
      setPreviewImageUrl(formData.productImageUrl);
      setPreviewIngredientsImageUrl(formData.ingredientsImageUrl);
      setDescription(formData.description);
      setSuggestion(formData.suggestion);
    }
  }, [formData]);

  const fetchProductForm = async (productId: number) => {
    try {
      const res = await api.get(`/api/staff/products/${productId}`);
      setFormData(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch product:", err);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [supplierRes, categoryRes, animalRes, countryRes] = await Promise.all([
        api.get("/api/staff/products/suppliers"),
        api.get("/api/staff/products/categories"),
        api.get("/api/staff/products/animals"),
        api.get("/api/staff/products/origins"),
      ]);
      setSuppliers(supplierRes.data);
      setCategories(categoryRes.data);
      setAnimals(animalRes.data);
      setCountries(countryRes.data);
    } catch (err) {
      console.error("❌ Failed to fetch init data:", err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductImageFile(file); // 파일 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIngredientsImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIngredientsImageFile(file); // 파일 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewIngredientsImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
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
    }
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("categoryId", String(selectedCategoryId!));
    form.append("productName", productName);
    form.append("supplierId", String(selectedSupplierId!));
    form.append("priceType", priceType);
    form.append("supplierPrice", supplierPrice);
    form.append("salePrice", salePrice);
    form.append("plu", plu);
    form.append("animalId", String(selectedAnimalId!));
    form.append("pasteurized", String(pasteurized));
    form.append("originId", String(selectedCountryId!));
    form.append("description", description);
    form.append("suggestion", suggestion);


    const allergyList = [];
    if (glutenFreeChecked) allergyList.push("G");
    if (lactoseFreeChecked) allergyList.push("L");

    // ✅ 하나씩 append 해줘야 Spring에서 List<Enum> 파싱 가능
    for (const allergy of allergyList) {
      form.append("allergies", allergy);
    }

    if (productImageFile) form.append("productImage", productImageFile);
    if (ingredientsImageFile) form.append("ingredientsImage", ingredientsImageFile);

    try {
      if (id) {
        // 수정
        form.append("pid", id);
        await api.put(`/api/staff/products/${id}`, form, {
          // headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product updated successfully!");
        navigate("/staff/menu");
      } else {
        // 등록
        await api.post("/api/staff/products", form, {
          // headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product added successfully!");
        navigate("/staff/menu"); // ✅ 등록 후에도 이동 추가
      }
    } catch (err) {
      console.error("❌ Failed to save product:", err);
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
                value={selectedCategoryId !== null ? String(selectedCategoryId) : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategoryId(value === "" ? null : Number(value));
                }}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.categoryId} value={String(category.categoryId)}>
                      {category.categoryName}
                    </option>
                  );
                })}
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
              <input
                type="text"
                className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <div>
                <label className="block text-sm font-semibold mb-1">Supplier</label>
                <select
                  value={selectedSupplierId !== null ? String(selectedSupplierId) : ""}
                  onChange={(e) => {
                    const id = e.target.value === "" ? null : Number(e.target.value);
                    setSelectedSupplierId(id);
                  }}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.sid} value={String(supplier.sid)}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>

              </div>
            </div>
          </div>

          {/* Row 2: Price Type */}
          <div className="flex mb-4 items-center">
            <label className="block text-sm font-semibold mb-1 mr-3">Price Type</label>
            <div className="flex gap-3">
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    name="priceType"
                    value="W"
                    checked={priceType === "W"}
                    onChange={() => setPriceType("W")}
                  />
                  Whole Wheel
                </label>

                <label>
                  <input
                    type="radio"
                    name="priceType"
                    value="U"
                    checked={priceType === "U"}
                    onChange={() => setPriceType("U")}
                  />
                  Pre-Pack
                </label>
              </div>
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
                  value={supplierPrice}
                  onChange={(e) => setSupplierPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row item-start md:items-center mb-2">
                <label className="text-sm mr-3 w-[75px]">Sale price</label>
                <input
                  type="text"
                  className="w-full lg:w-[200px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
              {priceType === "W" && (
                <div className="flex flex-col md:flex-row item-start md:items-center mb-2">
                  <label className="text-sm mr-3 w-[75px]">PLU</label>
                  <input
                    type="text"
                    className="w-full lg:w-[200px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                    value={plu}
                    onChange={(e) => setPlu(e.target.value)}
                  />
                </div>)}
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label className="block text-sm font-semibold mb-1">Source Animal</label>
                <select
                  value={selectedAnimalId !== null ? String(selectedAnimalId) : ""}
                  onChange={(e) => {
                    const id = e.target.value === "" ? null : Number(e.target.value);
                    setSelectedAnimalId(id);
                  }}
                >
                  <option value="">Select Animal</option>
                  {animals
                    .filter((animal) => {
                      if (selectedCategoryId === 2) {
                        // ✅ Cheese일 때 (categoryId === 2) → animalId 1~5만
                        return animal.animalId >= 1 && animal.animalId <= 5;
                      } else {
                        // ✅ Cheese 외 카테고리 → animalId 6 이상만
                        return animal.animalId >= 6 || animal.animalId == 4;
                      }
                    })
                    .map((animal) => (
                      <option key={animal.animalId} value={String(animal.animalId)}>
                        {animal.animalName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold">Pasteurized</label>
                <input
                  type="checkbox"
                  checked={pasteurized}
                  onChange={() => setPasteurized(!pasteurized)}
                  className="w-4 h-4"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Country of Origin</label>
                <select
                  value={selectedCountryId !== null ? String(selectedCountryId) : ""}
                  onChange={(e) => {
                    const id = e.target.value === "" ? null : Number(e.target.value);
                    setSelectedCountryId(id);
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.countryId} value={String(country.countryId)}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Ingredients and Allergy Mark */}
          <div className="flex gap-6 mb-6 items-start justify-between">
            {/* Ingredients 이미지 업로드 */}
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

            {/* 알러지 체크박스 */}
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
                    value="G" // ✅ 추가
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
                    value="L" // ✅ 추가
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
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row 6: Serving Suggestion */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Serving suggestion</label>
            <textarea
              className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
              rows={2}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              type="button"
              className="bg-[#AD343E] text-white px-4 py-2 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StaffAddMenuForm;