import youtube from '../assets/footer-icons/youtube.svg'
import whatsapp from '../assets/footer-icons/whatsapp.svg'
import facebook from '../assets/footer-icons/facebook.svg'
import instagram from '../assets/footer-icons/instagram.svg'
import email from '../assets/footer-icons/email.svg'
import telegram from '../assets/footer-icons/telegram.svg'


export default function Footer() {
    return (
        <footer className="bg-white shadow-lg mt-20 py-12">
            <div className="container mx-auto px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <h3 className="font-modam text-2xl font-bold">برنامه‌نویسی</h3>
                            <p className="font-yekan text-gray-600">barmanenevis.ir</p>
                        </div>
                        <img src="/logo.svg" alt="لوگو سایت" className="h-14"/>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="w-12 h-12 bg-[#D5E7B5] rounded-lg flex items-center justify-center hover:bg-[#3A31C2] transition-colors">
                            <img src={youtube} alt="یوتیوب" className="w-6 h-6"/>
                        </div>
                        <div
                            className="w-12 h-12 bg-[#D5E7B5] rounded-lg flex items-center justify-center hover:bg-[#3A31C2] transition-colors">
                            <img src={whatsapp} alt="واتساپ" className="w-6 h-6"/>
                        </div>
                        <div
                            className="w-12 h-12 bg-[#D5E7B5] rounded-lg flex items-center justify-center hover:bg-[#3A31C2] transition-colors">
                            <img src={facebook} alt="فیسبوک" className="w-6 h-6"/>
                        </div>
                        <div
                            className="w-12 h-12 bg-[#D5E7B5] rounded-lg flex items-center justify-center hover:bg-[#3A31C2] transition-colors">
                            <img src={instagram} alt="اینستاگرام" className="w-6 h-6"/>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 my-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-right">
                        <h4 className="font-yekan text-xl font-medium mb-4">درباره ما</h4>
                        <p className="font-yekan text-gray-600">
                            شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی،با خیال راحت و بدون استرس میتونی از مسیر
                            لذت ببری. ما در دنیای برنامه نویسی، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد
                            کنیم و از نتیجه زحمات مون لذت ببریم.
                        </p>
                    </div>
                    <div className="text-right">
                        <h4 className="font-yekan text-xl font-medium mb-4">دوره‌های پرطرفدار</h4>
                        <ul className="font-yekan text-gray-600">
                            <li>آموزش زبان پایتون</li>
                            <li>آموزش جاوا اسکریپت</li>
                            <li>آموزش React JS</li>
                        </ul>
                    </div>
                    <div className="text-right">
                        <h4 className="font-yekan text-xl font-medium mb-4">اساتید دوره‌ها</h4>
                        <ul className="font-yekan text-gray-600">
                            <li>ابوالفضل هادی‌نژاد</li>
                            <li>مسیح مصطفیی</li>
                            <li>امیرحسین حمیدی</li>
                            <li>حسین مفیدی</li>
                        </ul>
                    </div>
                    <div className="text-right">
                        <h4 className="font-yekan text-xl font-medium mb-4">ارتباط با ما</h4>
                        <ul className="font-yekan text-gray-600">
                            <li className="flex items-center justify-end gap-2">
                                <a href="mailto:admin@barnamenevis.ir">admin@barnamenevis.ir</a>
                                <img src={email} alt="ایمیل" className="w-6 h-6"/>
                            </li>
                            <li className="flex items-center justify-end gap-2">
                                <a href="mailto:abolfazl.hadinjad@">abolfazl.hadinjad@</a>
                                <img src={telegram} alt="تلگرام" className="w-6 h-6"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}