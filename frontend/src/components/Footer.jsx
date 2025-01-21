import './Footer.css';
import youtube from '../assets/footer-icons/youtube.svg'
import facebook from '../assets/footer-icons/facebook.svg'
import whatsapp from '../assets/footer-icons/whatsapp.svg'
import instagram from '../assets/footer-icons/instagram.svg'
import email from '../assets/footer-icons/email.svg'
import telegram from '../assets/footer-icons/telegram.svg'

export default function Footer() {
    const icons = [
        {icon: youtube, alt: "یوتیوب", class: 'icon youtube'},
        {icon: whatsapp, alt: "واتساپ", class: "icon whatsapp"},
        {icon: facebook, alt: "فیسبوک", class: "icon facebook"},
        {icon: instagram, alt: "اینستاگرام", class: "icon instagram"},
    ]

    return (
        <footer className="footer">
            <FooterTop icons={icons}/>
            <div className="divider"></div>
            <FooterBottom/>
        </footer>
    )
}

// eslint-disable-next-line react/prop-types
function FooterTop({icons}) {
    return (
        <div className="footer-top">
            <LogoTop/>

            <div className="social-icons">
                {/* eslint-disable-next-line react/prop-types */}
                {icons.map((icon) => (
                        // eslint-disable-next-line react/jsx-key
                        <SocialIcons icon={icon.icon} iconClass={icon.class} iconAlt={icon.alt}/>
                    )
                )}
            </div>
        </div>
    )
}

function FooterBottom() {
    return (
        <div className="footer-bottom">
            <About/>
            <FavoriteCourse/>
            <Teachers/>
            <ContactUs/>
        </div>
    )
}

function LogoTop() {
    return (
        <div className="logo-section">
            <div className="logo-text">
                <h3>برنامه‌نویسی</h3>
                <p>barmanenevis.ir</p>
            </div>
            <img src="/logo.svg" alt="لوگو سایت"/>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function SocialIcons({icon, iconAlt, iconClass}) {
    return (
        <div className={iconClass}>
            <img src={icon} alt={iconAlt}/>
        </div>
    )
}

function About() {
    return (
        <div id="about" className="column1">
            <h4>درباره ما</h4>
            <p>شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی،با خیال راحت و بدون استرس میتونی از مسیر لذت
                ببری. ما در دنیای برنامه نویسی، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از
                نتیجه زحمات مون لذت ببریم.</p>
        </div>
    )
}

function FavoriteCourse() {
    return (
        <div className="footer-column column2">
            <h4>دوره‌های پرطرفدار</h4>
            <ul>
                <li>آموزش زبان پایتون</li>
                <li>آموزش جاوا اسکریپت</li>
                <li>آموزش React JS</li>
            </ul>
        </div>
    )
}

function Teachers() {
    return (
        <div className="footer-column column3">
            <h4>اساتید دوره‌ها</h4>
            <ul>
                <li>ابوالفضل هادی‌نژاد</li>
                <li>مسیح مصطفیی</li>
                <li>امیرحسین حمیدی</li>
                <li>حسین مفیدی</li>
            </ul>
        </div>
    )
}

function ContactUs() {
    const contacts = [
        {
            href: "mailto:admin@barnamenevis.ir",
            name: "admin@barnamenevis.ir",
            src: email,
            alt: "ایمیل",
        },
        {
            href: "https://t.me/abolfazlhadinjad",
            name: "abolfazlhadinjad@",
            src: telegram,
            alt: "تلگرام",
        },
    ]

    return (
        <div className="footer-column column4">
            <h4>ارتباط با ما</h4>
            <ul>
                {contacts.map((contact) => (
                    // eslint-disable-next-line react/jsx-key
                    <li>
                        <Contact
                            href={contact.href}
                            name={contact.name}
                            alt={contact.name}
                            src={contact.src}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function Contact({href, name, src, alt}) {
    return (
        <>
            <a href={href}>{name}</a>
            <img src={src} alt={alt}/>
        </>
    )
}