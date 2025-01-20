import Header from "./Header.jsx";
import {Helmet} from "react-helmet";

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>صفحه مورد نظر یافت نشد</title>
            </Helmet>
            <Header />
            <img src="/notfound.png" alt="صفحه مورد نظر پیدا نشد" />
            <h1>صفحه مورد نظر پیدا نشد !</h1>
        </>
    )
}