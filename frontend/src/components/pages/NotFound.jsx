import {Helmet, HelmetProvider} from "react-helmet-async";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    let navigate = useNavigate();

    return (
        <HelmetProvider>
            <Helmet>
                <title>صفحه مورد نظر یافت نشد</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img src="/notfound.png" alt="صفحه مورد نظر پیدا نشد" className="h-[60vh] w-auto"/>
                <h1 className="font-black text-5xl mt-4">صفحه مورد نظر یافت نشد !</h1>
                <button
                    className="block bg-[#E02B2B] transition-colors hover:bg-[#c82333] text-white mt-10 rounded-xl h-10 w-40 mx-auto"
                    onClick={() => navigate("/")}
                >
                    بازگشت به صفحه اصلی
                </button>
            </div>
        </HelmetProvider>
    );
}