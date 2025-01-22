import headerIcon from '../assets/icons/headerIcon.svg';
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const navbarItems = [
        {item: 'صفحه اصلی', href: '/'},
        {item: 'دوره های آموزشی', href: ''},
        {item: 'درباره ما', href: '#about'},
    ]

    let navigate = useNavigate()

    return (
        <header
            className="md:h-[95px] md:py-[10 px] max-[480px]:h-auto max-[480px]:p-[10px_15px] max-[480px]:flex max-[480px]:flex-col max-[480px]:items-center relative top-10 w-[95%] h-[95px] bg-white shadow-[0_11px_200px_rgba(0,0,0,0.1)] rounded-b-[20px] flex justify-between items-center px-4 md:px-10 box-border mx-auto max-w-[1440px]">
            <div className="relative w-full max-w-[1440px] h-full flex justify-between items-center mx-auto box-border">
                <Navbar items={navbarItems}/>

                <Link to="/">
                    <img src="/logo.svg" alt="لوگو آکادمی"
                         className="h-[59px] w-[80px] md:w-[120px] transition-opacity duration-300 hover:opacity-80"/>
                </Link>

                <div className="flex items-center gap-4 md:gap-10">
                    <img src={headerIcon} alt="icon"
                         className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-70"/>

                    <button onClick={() => {
                        navigate("/login")
                    }}
                            className="w-[120px] md:w-[166px] h-[40px] md:h-[52px] bg-[#3A31C2] text-[#F9F9F9] font-yekan text-sm md:text-lg font-medium leading-[24px] md:leading-[28px] text-center border-none rounded-[5px] cursor-pointer transition-colors duration-200 hover:opacity-80 hover:bg-[#130d6e]">
                        ورود / ثبت نام
                    </button>
                </div>
            </div>
        </header>
    );
}

// eslint-disable-next-line react/prop-types
function Navbar({items}) {
    return (
        <nav className="flex items-center gap-20">
        <ul className="list-none flex flex-wrap gap-5">
                {/* eslint-disable-next-line react/prop-types */}
                {items.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <NavbarItem item={item.item} href={item.href}/>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// eslint-disable-next-line react/prop-types
function NavbarItem({item, href}) {
    return (
        <Link to={href} className="text-sm md:text-base font-yekan font-bold text-black no-underline transition-colors
        hover:text-[#3A31C2]">{item}</Link>
    );
}