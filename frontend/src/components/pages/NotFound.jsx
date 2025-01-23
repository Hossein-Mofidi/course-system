import Header from "../Header.jsx";
import {Helmet, HelmetProvider} from "react-helmet-async";

export default function NotFound() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>صفحه مورد نظر یافت نشد</title>
            </Helmet>
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img src="/notfound.png" alt="صفحه مورد نظر پیدا نشد" className="h-[60vh] w-auto"/>
                <h1 className="font-black text-5xl mt-4">صفحه مورد نظر یافت نشد !</h1>
            </div>
        </HelmetProvider>
    );
}