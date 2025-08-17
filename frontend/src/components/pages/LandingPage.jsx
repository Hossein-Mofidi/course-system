import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import model from "../../assets/icons/model.svg";
import vector from "../../assets/icons/vector.svg";
import wallet from "../../assets/icons/wallet.svg";
import video from "../../assets/icons/video.svg";
import user from "../../assets/icons/user.svg";
import setting from "../../assets/icons/setting.svg";
import CountUp from "react-countup";

export default function LandingPage() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}

function Main() {
    return (
        <main>
            <Hero/>
            <Properties/>

        </main>
    )
}

function Hero() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-16">
            <div className="text-center md:text-right">
                <h1 className="font-modam font-bold text-3xl md:text-5xl leading-normal">
                    آکادمی آموزش<br/>برنامه‌نویسی پیشرفته
                </h1>
                <div className="flex mt-6 items-center justify-center gap-6 md:gap-12">
                    <button
                        className="bg-[#3A31C2] hover:bg-blue-900 transition-colors duration-300 text-white rounded-md py-2 md:py-3 px-5 md:px-7">
                        <pre className="font-yekan inline">شروع یادگیری برنامه نویسی   </pre>
                        <img src={vector} className="inline" alt=""/>
                    </button>
                    <a href="#"
                       className="font-medium p-4 text-gray-700 hover:text-blue-600 hover:bg-gray-300 rounded-md transition-colors duration-300">
                        ارتباط با ما
                    </a>
                </div>
            </div>
            <div className="mt-8 md:mt-0">
                <img src={model} alt="مدل" className="w-64 md:w-auto h-auto"/>
            </div>
            <HeroStats/>
        </section>
    )
}

function HeroStats() {
    const heroStats = [
        {value: 18, content: 'متخصص مجرب'},
        {value: 24, content: 'دوره آموزشی موفق'},
        {value: 150, content: 'هنرجوی موفق'},
    ]

    return (
        <div className="hidden md:block">
            {heroStats.map((heroStat) => (
                    <HeroStat
                        key={heroStat.value}
                        value={heroStat.value}
                        content={heroStat.content}/>
                )
            )}
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function HeroStat({value, content}) {
    return (
        <div className="text-center mb-9">
            <h2 className="font-bold text-4xl">
                <CountUp start={0} duration={3} end={value}/>+
            </h2>
            <p className="text-gray-600">{content}</p>
        </div>
    )
}


function Properties() {
    const properties = [
        {text: "بزار خیالتو راحت کنم توی دوره ها به ریز ترین موارد پرداختیم.", icon: video},
        {text: "بهترین اساتید از سرتاسر کشور برای شما انتخاب شده اند.", icon: user},
        {text: "دوره های ما پروژه محور برای کسب مهارت انجام پروژه های واقعی", icon: setting},
        {text: "از هر دوره ای ناراضی بودی میتونی درخواست بازگشت وجه بدی.", icon: wallet},
    ];

    return (
        <section className="text-center mt-32">
            <p className="text-gray-600">ویژگی های ما</p>
            <h2 className="font-bold text-3xl font-modam mt-4">چرا باید سایت ما رو انتخاب کنید؟</h2>
            <div className="flex gap-8 justify-center items-center mt-20">
                {properties.map((property, index) => (
                    <Property
                        key={property.icon}
                        text={property.text}
                        icon={property.icon}
                        className={index === 0 || index === properties.length - 1 ? "mt-[-100px]" : ""}
                    />
                ))}
            </div>
        </section>
    );
}

// eslint-disable-next-line react/prop-types
function Property({text, icon, className}) {
    return (
        <div
            className={`group cursor-pointer hover:bg-[#E5F2CD] hover:-translate-y-[10px] hover:shadow-xl transition-all duration-300 bg-white rounded-3xl shadow-lg flex flex-col items-start w-60 h-50 ${className}`}>
            <div
                className="flex bg-[#3A31C2] p-4 my-7 mx-5 rounded-xl group-hover:rotate-[360deg] transition-all duration-300">
                <img src={icon} alt="آیکون" className="w-8 h-8 group-hover:opacity-50 transition-opacity duration-300"/>
            </div>
            <p className="text-right mx-5 mb-10 text-gray-700 font-medium">{text}</p>
        </div>
    );
}