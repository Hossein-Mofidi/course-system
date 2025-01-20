import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import model from "../assets/icons/model.svg"
import flashicon from "../assets/icons/flashIcon.svg"
import wallet from "../assets/icons/wallet.svg"

export default function LandingPage() {
    return (
        <>
            <Header/>
            <Footer/>
        </>
    )
}

function Main() {
    return (
        <div className="mainpage">
            <main>
                <section className="hero">
                    <div
                        className="hero-stats absolute w-[126px] h-auto left-[120px] top-[225px] flex flex-col items-center">
                        <div className="stat-item flex items-center p-[5px]">
                            <p className="stat-value pl-[20px] font-yekanbakh font-black text-[36px] leading-[56px]">+18</p>
                            <p className="stat-label-m -ml-[20px] font-yekanbakh font-medium text-[18px] leading-[28px] text-black">متخصص
                                مجرب</p>
                        </div>
                        <div className="stat-item flex items-center p-[5px]">
                            <p className="stat-value pl-[20px] font-yekanbakh font-black text-[36px] leading-[56px]">+24</p>
                            <p className="stat-label-a -ml-[35px] font-yekanbakh font-medium text-[18px] leading-[28px] text-black">دوره
                                آموزشی موفق</p>
                        </div>
                        <div className="stat-item flex items-center p-[5px]">
                            <p className="stat-value pl-[20px] font-yekanbakh font-black text-[36px] leading-[56px]">+150</p>
                            <p className="stat-label-h -ml-[4px] font-yekanbakh font-medium text-[18px] leading-[28px] text-black">هنرجوی
                                موفق</p>
                        </div>
                    </div>

                    <div className="hero-model absolute w-[468px] h-[502px] left-[318px] top-[161px]">
                        <div
                            className="background-purple absolute w-[455px] h-[453px] left-0 top-[34px] bg-[#3A31C2] shadow-md rounded-[65px]"></div>
                        <div
                            className="background-gradient absolute w-[455px] h-[453px] left-[17px] top-[49px] bg-gradient-to-br from-[#E5F2CD] to-[#D5E7B5] rounded-[65px]"></div>
                        <div className="model-image absolute w-[393px] h-[502px] left-[48px] top-0">
                            <img src={model} alt="مدل" className="w-full h-auto rounded-[65px]"/>
                        </div>
                    </div>

                    <div
                        className="hero-content absolute w-[500px] h-auto left-[838px] top-[304px] text-right flex flex-col gap-[20px]">
                        <h1 className="hero-title font-modam font-bold text-[53px] leading-[76px] text-black m-0">آکادمی
                            آموزشی برنامه‌نویسی پیشرفته</h1>
                        <div className="hero-actions flex items-center justify-end gap-[40px] mt-[20px]">
                            <a href="#"
                               className="contact-link font-yekanbakh font-medium text-[24px] leading-[28px] text-[#3A31C2] no-underline hover:text-[#130d6e] transition-colors">ارتباط
                                با ما</a>
                            <button
                                className="hero-button flex items-center justify-center gap-[5px] w-[300px] h-[60px] bg-[#3A31C2] border-[1.5px] border-[#222d83] rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity">
                                <span className="button-icon">
                                    <img src={flashicon} alt="فلش" className="w-[50px] h-[25px]"/>
                                </span>
                                <span
                                    className="button-text font-yekanbakh font-medium text-[18px] leading-[28px] text-[#F9F9F9]">شروع یادگیری برنامه نویسی</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <p className="features-subtitle absolute w-[116px] h-[37px] left-[662px] top-[794px] font-yekanbakh font-normal text-[24px] leading-[37px] text-center text-black">ویژگی
                        های ما</p>
                    <h2 className="features-title absolute w-[471px] h-[51px] left-[484px] top-[832px] font-modam font-semibold text-[36px] leading-[51px] text-center text-black">چرا
                        باید سایت ما رو انتخاب کنید؟</h2>
                    <div className="features-cards">
                        <div
                            className="card-wallet absolute w-[270px] h-[259px] rounded-[25px] bg-white shadow-lg cursor-pointer transition-all hover:bg-[#E5F2CD] hover:shadow-[0_15px_50px_rgba(58,49,194,0.4)] hover:-translate-y-[10px] left-[133px] top-[914px]">
                            <div
                                className="card-icon-wallet absolute w-[76px] h-[76px] left-[160px] top-[32px] bg-[#3A31C2] rounded-[12px] flex items-center justify-center transition-all">
                                <img src={wallet} alt="آیکون کیف پول"
                                     className="w-[36px] h-[36px] transition-opacity"/>
                            </div>
                            <p className="card-text absolute w-[218px] h-auto left-[26px] top-[135px] font-yekanbakh font-normal text-[18px] leading-[28px] text-right text-black">از
                                هر دوره‌ای ناراضی بودی میتونی درخواست بازگشت وجه بدی</p>
                        </div>
                    </div>
                </section>

                <section id="courses" className="courses">
                    <div
                        className="courses-title absolute w-[253px] h-[51px] left-[1063px] top-[1440px] font-modam font-semibold text-[36px] leading-[51px] text-right text-black">دوره
                        های آموزشی
                    </div>
                    <div className="line-container">
                        <div
                            className="line-1 absolute w-[329px] h-0 left-[711px] top-[1472px] border-t-[3px] border-[#3A31C2]"></div>
                        <div
                            className="line-1-diamond absolute w-[10px] h-[10px] bg-[#3A31C2] left-[700px] top-[1468px] rotate-45"></div>
                    </div>
                    <div className="course-tabs absolute top-[1445px] left-[95px] flex gap-[20px]">
                        <button
                            className="tab w-[126px] h-[53px] bg-[#3A31C2] rounded-[10px] font-yekanbakh font-normal text-[18px] leading-[28px] text-white flex items-center justify-center cursor-pointer hover:bg-[#D3E2B5] hover:text-black">دسکتاپ
                        </button>
                    </div>
                    <div id="courses-section"></div>
                </section>
            </main>
        </div>
    )
}