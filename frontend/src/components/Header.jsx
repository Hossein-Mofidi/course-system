import headerIcon from '../assets/icons/headerIcon.svg'
import {Link} from "react-router-dom";


export default function Header() {
    return (
        <header className="flex justify-center items-center h-24 bg-white shadow-lg rounded-xl mx-32 my-6">
            <div className="flex justify-between items-center w-full px-8">
                <button
                    className="bg-[#3A31C2] text-white font-yekan font-medium text-lg px-6 py-3 rounded-lg hover:bg-[#130d6e] transition-colors">
                    ورود / ثبت نام
                </button>
                <img src={headerIcon} alt="icon" className="w-52px h-52px bg-[#D5E7B5] rounded-lg p-2 hover:opacity-70 cursor-pointer" />
                <div className="logo">
                    <Link to="/">
                        <img src="/logo.svg" alt="لوگو آکادمی" className="h-14"/>
                    </Link>
                </div>
                <nav className="flex gap-8">
                    <ul className="flex gap-6">
                        <li>
                            <a href="#"
                               className="font-yekan text-lg text-black hover:text-[#3A31C2] transition-colors">
                                درباره ما
                            </a>
                        </li>
                        <li>
                            <a href="/course"
                               className="font-yekan text-lg text-black hover:text-[#3A31C2] transition-colors">
                                دوره‌های آموزشی
                            </a>
                        </li>
                        <li>
                            <a href="/"
                               className="font-yekan text-lg text-black hover:text-[#3A31C2] transition-colors">
                                صفحه اصلی
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}