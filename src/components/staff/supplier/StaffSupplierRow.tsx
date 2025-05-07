import { Supplier } from "@/type";

type StaffSupplierRowProps = {
  supplier: Supplier;
  setIsOpen: (open: boolean) => void;
  setSelectedSupplier: (supplier: Supplier) => void;
  formatTime24To12: (time: string) => string;
  formatDate: (date: string) => string;
  updateSupplierStatus: (id: string, status: string) => void; // id를 string으로 수정
};


const StaffSupplierRow = ({
  suppliers,
  setIsOpen,
  setSelectedSupplier
}: StaffSupplierRowProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 text-center font-medium bg-white mb-6 py-4 px-3 rounded-[7.5px] shadow-sm">
      {/* Supplier No. */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Supplier No.</span>
        <span>#{suppliers.sid}</span>
      </div>

      {/* Supplier Name */}
      <div
        className="flex flex-col md:flex-row justify-between md:justify-center md:items-center cursor-pointer">
        <span className="md:hidden font-semibold text-[#]">Supplier Name</span>
        <span>{suppliers.supplierName}</span>
      </div>

      {/* Contact Name */}
      <div
        className="flex flex-col md:flex-row justify-between md:justify-center md:items-center cursor-pointer">
        <span className="md:hidden font-semibold text-[#]">Contact Name</span>
        <span>{suppliers.contactName}</span>
      </div>

      {/* Email */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#]">Email</span>
        <span>{suppliers.sEmail}</span>
      </div>

      {/* Phone no */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#]">Phone Number</span>
        <span>{suppliers.sPhone}</span>
      </div>

{/* 
      Note
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#]">Product</span>
        <span>{suppliers.note}</span>
      </div> */}
    </div>
  );
};

export default StaffSupplierRow;
