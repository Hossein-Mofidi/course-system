import './Header.css'
import headerIcon from '../assets/icons/headerIcon.svg'

export default function Header() {
    const navbarItems = ['صفحه اصلی', 'دوره های آموزشی', 'درباره ما']

    return (
        <header
            className="sticky top-10 left-10 w-full h-[95px] bg-white shadow-[0_11px_200px_rgba(0,0,0,0.1)] rounded-b-[20px] flex justify-between items-center px-[40px] box-border  max-w-7xl mx-auto">
            <div className="w-full max-w-[1440px] h-full flex justify-between items-center mx-auto box-border">
                <div className="flex items-center gap-10">
                    <button className="w-[166px] h-[52px] bg-[#3A31C2] text-[#F9F9F9] font-yekan-bakh text-lg font-medium
                    leading-[28px] text-center border-none rounded-[5px] cursor-pointer transition-colors duration-200
                    hover:opacity-80 hover:bg-[#130d6e]">ورود / ثبت نام
                    </button>

                    <img src={headerIcon} id="headerIcon" alt="icon"
                         className="w-[52px] h-[52px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-70"/>
                </div>

                <div className="logo">
                    <img src="/logo.svg" alt="لوگو آکادمی"/>
                </div>

                <Navbar items={navbarItems}/>
            </div>
        </header>
    )
}

// eslint-disable-next-line react/prop-types
function Navbar({items}) {
    return (
        <nav className="nav">
            <ul className="nav-list">
                {/* eslint-disable-next-line react/prop-types */}
                {items.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <NavbarItem item={item} href="#top"/>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// eslint-disable-next-line react/prop-types
function NavbarItem({item, href}) {
    return (
        <a href={href} className="nav-item">{item}</a>
    )
}
