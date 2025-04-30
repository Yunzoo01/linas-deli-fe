type StaffMyInfoSidebarProps = {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
};

function StaffMyInfoSidebar({ selectedTab, setSelectedTab }: StaffMyInfoSidebarProps) {
    return (
        <aside className="hidden lg:flex flex-col justify-end w-60 h-[400px] bg-[#AD343E] text-white p-6 rounded-b-xl ml-6">
            <h2 className="text-xl font-bold mb-6 text-center">My Page</h2>
            <ul className="space-y-2">
                <li
                    onClick={() => setSelectedTab("profile")}
                    className={`flex justify-between items-center py-2 px-4 rounded-full cursor-pointer transition-all duration-200 ${selectedTab === "profile"
                            ? "bg-white text-black font-semibold"
                            : "hover:bg-[#c3515a]"
                        }`}
                >
                    Profile
                    <span className="ml-2">→</span>
                </li>
                <li
                    onClick={() => setSelectedTab("promotion")}
                    className={`flex justify-between items-center py-2 px-4 rounded-full cursor-pointer transition-all duration-200 ${selectedTab === "promotion"
                            ? "bg-white text-black font-semibold"
                            : "hover:bg-[#c3515a]"
                        }`}
                >
                    Promotion
                    <span className="ml-2">→</span>
                </li>
            </ul>
        </aside>
    );
}

export default StaffMyInfoSidebar;