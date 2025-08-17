import headerIcon from '../assets/icons/headerIcon.svg';
import profileIcon from '../assets/icons/profile.svg';
import {Link, useNavigate} from "react-router-dom";
import {RxHamburgerMenu} from "react-icons/rx";

export default function Header() {
    const navbarItems = [
        {item: 'صفحه اصلی', href: '/'},
        {item: 'دوره های آموزشی', href: '/courses'},
        {item: 'درباره ما', href: '#about'},
    ];

    let navigate = useNavigate();

    return (
        <header
            className="flex flex-row my-9 mx-4 md:mx-12 lg:mx-24 py-4 px-4 md:px-9 justify-between items-center bg-white rounded-md">
            {/* بخش چپ: آیکون همبرگر */}
            <div className="md:flex-1 flex justify-start items-center">
                <div className="md:hidden bg-gray-100 p-3.5 rounded-md">
                    <RxHamburgerMenu className="text-md cursor-pointer h-[24px] w-auto"/>
                </div>

                <div className="hidden md:flex">
                    <Navbar items={navbarItems}/>
                </div>
            </div>

            {/* بخش وسط: لوگو آکادمی */}
            <Link to="/" className="hover:opacity-70 transition-opacity duration-300">
                <img src="/logo.svg" alt="لوگو آکادمی"/>
            </Link>

            {/* بخش راست: آیکون‌ها و دکمه‌ها */}
            <div className="md:flex-1 flex justify-end gap-3 md:gap-5 items-center">
                <img
                    src={headerIcon}
                    alt="icon"
                    className="h-[52px] cursor-pointer w-auto hover:opacity-70 transition-opacity duration-300"
                />

                <div className="md:hidden p-3.5 bg-[#3A31C2] rounded-md">
                    <img
                        src={profileIcon}
                        alt="پروفایل"
                        className="h-[24px] w-auto"
                    />
                </div>

                <button
                    onClick={() => navigate("/login")}
                    className="hidden md:block hover:bg-blue-900 bg-[#3A31C2] text-white rounded-md px-6 py-3 md:px-8 md:py-3.5 font-bold transition-colors duration-300"
                >
                    ورود / ثبت نام
                </button>
            </div>
        </header>
    );
}

// eslint-disable-next-line react/prop-types
function Navbar({items}) {
    return (
        <nav className="flex flex-row gap-3 items-center font-medium text-md">
            {/* eslint-disable-next-line react/prop-types */}
            {items.map((item) => (
                <NavbarItem key={item.item} item={item.item} href={item.href}/>
            ))}
        </nav>
    );
}

// eslint-disable-next-line react/prop-types
function NavbarItem({item, href}) {
    return (
        <Link
            to={href}
            className="font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-300 px-4 py-2"
        >
            {item}
        </Link>
    );
}