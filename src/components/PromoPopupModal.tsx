import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { Promotion } from "@/type";

interface Props {
  promotion: Promotion;
  onClose: () => void;
}

const PromoPopupModal = ({ promotion, onClose }: Props) => {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 헤더 */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#AD343E] text-white">
              <h3 className="text-lg font-semibold">
                {promotion.promotionTitle}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* 이미지 */}
            {promotion.promotionImageUrl && (
              <img
                src={promotion.promotionImageUrl}
                alt={promotion.promotionTitle}
                className="w-full h-80 object-cover"
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PromoPopupModal;