import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Textarea } from "../../../node_modules/@headlessui/react/dist/index";

const StaffOrderModal = ({ isOpen, setIsOpen, order }) => {


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[140]" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30 bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center  p-4">
            <Dialog.Panel className="w-full max-w-5xl max-h-full bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4 bg-[#AD343E] p-7 text-white">
                <Dialog.Title className="text-lg font-semibold">Order Information</Dialog.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-1 px-7 max-h-10/12 overflow-auto">
                <div className="flex justify-between">
                  <p className="text-xl font-bold text-gray-700">
                    #{order.oid} - {order.status}
                  </p>
                  <p className="text-xl font-bold text-gray-700">
                    7:50 PM, Feb 11
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={order.date}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={order.time}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex flex-col justify-between lg:w-[49%]">
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">Name</label>
                      <input
                        type="input"
                        value={order.customerName}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">Phone</label>
                      <input
                        type="input"
                        value={order.phone}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">E-mail</label>
                      <input
                        type="input"
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                        placeholder="Enter your name"
                        value={order.email}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-[50%] justify-between">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Allergy</label>
                    <Textarea
                      row="3"
                      className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                      placeholder="Enter your name"
                      value={order.allergy}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Note</label>
                    <Textarea
                      row="3"
                      className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                      placeholder="Enter your name"
                      value={order.message}
                    />
                  </div>
                <button type="submit" className="w-full py-2 bg-[#AD343E] text-white rounded-md">
                  Submit
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default StaffOrderModal;