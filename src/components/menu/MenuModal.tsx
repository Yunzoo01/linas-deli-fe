// src/components/menu/MenuModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { MenuItem } from "@/type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
}

const MenuModal = ({ isOpen, onClose, menuItem }: Props) => {
  if (!menuItem) return null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal Box */}
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
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <Dialog.Title className="text-xl font-bold flex items-center gap-3">
                  <span>{menuItem.productName}</span>
                  <img
                    src={`/Icon/flag/flag_${menuItem.countryName}.png`}
                    alt={menuItem.countryName}
                    className="w-6 h-4 object-cover shadow-sm"
                  />
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">Description</h3>
                    <p className="text-gray-800">{menuItem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">Serving Suggestion</h3>
                    <p className="text-gray-700">{menuItem.servingSuggestion}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 underline">Details</h3>
                    <p className="text-gray-700">
                      {menuItem.pasteurized ? "Pasteurized" : "Unpasteurized"},{" "}
                      {menuItem.animalName} milk
                    </p>
                  </div>
                </div>

                {menuItem.ingredientsImageUrl && (
                  <div className="flex-1">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${menuItem.ingredientsImageUrl}`}
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
