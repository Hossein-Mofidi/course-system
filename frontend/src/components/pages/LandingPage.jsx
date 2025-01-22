import Header from "../Header.jsx";
import './LandingPage.css'
import heroModel from '../../assets/icons/model.svg'
import Footer from "../Footer.jsx";

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
            <section className="hero">
                <HeroStats/>
                <HeroModel/>
                <div className="hero-content">
                    <h1 className="hero-title">آکادمی آموزشی برنامه‌نویسی پیشرفته</h1>
                    <div className="hero-actions">
                        <a href="#" className="contact-link">ارتباط با ما</a>
                        <button className="hero-button">
                            <span className="button-icon">
                            <img src="Asset/flashIcon.svg" alt="فلش"/>
                            </span>
                            <span className="button-text">شروع یادگیری برنامه نویسی</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="features">
                <p className="features-subtitle">ویژگی های ما</p>
                <h2 className="features-title">چرا باید سایت ما رو انتخاب کنید؟</h2>
                <div className="features-cards">
                    <div className="card-wallet">
                        <div className="card-icon-wallet">
                            <img src="Asset/wallet.svg" alt="آیکون کیف پول"/>
                        </div>
                        <p className="card-text">از هر دوره‌ای ناراضی بودی میتونی درخواست بازگشت وجه بدی</p>
                    </div>
                    <div className="card-setting">
                        <div className="card-icon-setting">
                            <img src="Asset/setting.svg" alt="آیکون تنظیمات"/>
                        </div>
                        <p className="card-text">دوره‌های ما برنامه محور برای کسب مهارت انجام پروژه‌های واقعی
                            هستند</p>
                    </div>
                    <div className="card-profile">
                        <div className="card-icon-profile">
                            <img src="Asset/profile.svg" alt="آیکون پروفایل"/>
                        </div>
                        <p className="card-text">بهترین اساتید از سر تا سر کشور برای شما انتخاب شده‌اند</p>
                    </div>
                    <div className="card-video-play">
                        <div className="card-icon-video-play">
                            <img src="video.svg" alt="آیکون پخش ویدیو"/>
                        </div>
                        <p className="card-text">بزار خیالتو راحت کنم توی دوره ها به ریز ترین موارد پرداختیم </p>
                    </div>
                </div>
            </section>
            <section id="courses" className="courses">
                <div className="courses-title">دوره های آموزشی</div>
                <div className="line-container">
                    <div className="line-1"></div>
                    <div className="line-1-diamond"></div>
                </div>
                <div className="course-tabs">
                    <button className="tab">دسکتاپ</button>
                    <button className="tab">اندروید</button>
                    <button className="tab">بک اند</button>
                    <button className="tab">فرانت اند</button>
                </div>

                <div id="courses-section">

                </div>
            </section>
        </main>
    )
}

function HeroStats() {
    const heroStats = [
        {class: 'm', value: '+18', content: 'متخصص مجرب'},
        {class: 'a', value: '+24', content: 'دوره آموزشی موفق'},
        {class: 'h', value: '+150', content: 'هنرجوی موفق'},
    ]

    return (
        <div className="hero-stats">
            {heroStats.map((heroStat) => (
                    // eslint-disable-next-line react/jsx-key
                    <HeroStat
                        key={heroStat.value}
                        classContent={heroStat.class}
                        value={heroStat.value}
                        content={heroStat.content}/>
                )
            )}
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function HeroStat({classContent, value, content}) {
    return (
        <div className="stat-item">
            <p className="stat-value">{value}</p>
            <p className={`stat-label ${classContent}`}>{content}</p>
        </div>
    )
}

function HeroModel() {
    return (
        <div className="hero-model">
            <div className="background-purple"></div>
            <div className="background-gradient"></div>
            <div className="model-image">
                <img src={heroModel} alt="مدل"/>
            </div>
        </div>
    )
}