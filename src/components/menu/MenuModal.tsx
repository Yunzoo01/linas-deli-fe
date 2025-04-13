import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  allergy: string[];
  price: number;
  glutenFree: boolean;
  servingSuggestion: string;
  pasteurized: boolean;
  imageUrl?: string;
  ingredientImageUrl?: string;
}

interface Country {
  id: number;
  name: string;
}

interface Animal {
  id: number;
  name: string;
}

interface MenuItem {
  productDetailId: number;
  product: Product;
  country: Country;
  animal: Animal;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
}

const MenuModal = ({ isOpen, onClose, menuItem }: Props) => {
  if (!menuItem) return null;

  const { product, country, animal } = menuItem;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 배경 */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        {/* 모달 박스 */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* 헤더 */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <Dialog.Title className="text-xl font-bold flex items-center gap-3">
                  <span>{product.name}</span>
                  <img
                    src={`/Icon/flag/flag_${country.name}.png`}
                    alt={country.name}
                    className="w-6 h-4 object-cover shadow-sm"
                  />
                  <div className="flex gap-2">
                    {product.allergy.includes("gluten") && (
                        <img src="/Icon/allergy/icon_glutenfree.png"
                              alt="gluten_free"
                              className="w-6 object-cover rounded shadow-sm"/>
                    )}
                    {product.allergy.includes("lactose") && (
                      <img src="/Icon/allergy/icon_lactosefree.png"
                      alt="lactose_free"
                      className="w-6 object-cover rounded shadow-sm"/>
                    )}
                  </div>
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>

              {/* 본문 */}
              <div className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">
                      Description
                    </h3>
                    <p className="text-gray-800">{product.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">
                      Serving Suggestion
                    </h3>
                    <p className="text-gray-700">{product.servingSuggestion}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">
                      Details
                    </h3>
                    <p className="text-gray-700">
                      {product.pasteurized ? "Pasteurized" : "Unpasteurized"},{" "}
                      {animal.name} milk
                    </p>
                  </div>
                </div>

                {product.ingredientImageUrl && (
                  <div className="flex-1">
                    <img
                      src={product.ingredientImageUrl}
                      alt="Ingredient"
                      className="w-full h-auto rounded-lg border object-contain shadow"
                    />
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MenuModal;
