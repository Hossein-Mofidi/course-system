import {useLocation, useNavigate} from "react-router-dom";

export default function Tabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const activeTab = location.pathname === "/admin/users" ? "users" : "courses";

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <button
                className={`h-14 w-full sm:w-60 font-medium rounded-xl ${
                    activeTab === "users"
                        ? "bg-[#3A31C2] hover:bg-[#2a238f] transition-colors text-white"
                        : "bg-white"
                }`}
                onClick={() => navigate("/admin/users")}
            >
                لیست کاربران
            </button>
            <button
                className={`h-14 w-full sm:w-60 font-medium rounded-xl ${
                    activeTab === "courses"
                        ? "bg-[#3A31C2] text-white hover:bg-[#2a238f] transition-colors"
                        : "bg-white"
                }`}
                onClick={() => navigate("/admin/courses")}
            >
                دوره‌های آموزشی
            </button>
        </div>
    );
}