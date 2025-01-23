import Tabs from "./Tabs.jsx";
import {Helmet, HelmetProvider} from "react-helmet-async";


export default function Users() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>لیست کاربران</title>
            </Helmet>
            <div className="relative flex gap-[40vw] top-10 mx-auto w-[90vw]">
                <Tabs/>
                <button className="bg-[#4F986C] rounded-md h-10 w-[9rem] text-white font-medium mt-4">
                    افزودن کاربر
                </button>
            </div>

            {/* محتوای لیست کاربران */}
            <div className="mt-10">
                <h1>لیست کاربران</h1>
                {/* محتوای مربوط به لیست کاربران */}
            </div>
        </HelmetProvider>
    );
}