import { Helmet, HelmetProvider } from "react-helmet-async";
import gallery from "../assets/icons/gallery.svg";
import { FaUser } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import Header from "./Header.jsx";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

export function Courses() {
    const coursesUrl = "http://localhost:8000/api/v1/courses/"

    // Fetch courses from the backend using React Query
    const { data: courses, isLoading, isError } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await fetch(coursesUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    // Loading state
    if (isLoading) {
        return <div className="text-center mt-10">در حال بارگذاری دوره‌ها...</div>;
    }

    // Error state
    if (isError) {
        return <div className="text-center mt-10 text-red-500">خطا در دریافت داده‌ها!</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>دوره های آموزشی</title>
            </Helmet>
            <Header />
            <h1 className="mt-10 font-bold text-4xl block text-center">دوره های آموزشی</h1>
            <div className="mx-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {courses.map((course) => (
                    <Course
                        key={course.id}
                        img={course.img || gallery}
                        title={course.title}
                        description={course.description}
                        instructor={course.instructor}
                        studentNumber={course.studentNumber}
                        price={course.price}
                    />
                ))}
            </div>
        </HelmetProvider>
    );
}

// eslint-disable-next-line react/prop-types
export function Course({ img, title, description, instructor, studentNumber, price }) {
    return (
        <div className="cursor-pointer w-64 bg-white rounded-xl py-4 px-3 shadow-md hover:translate-y-2">
            {img === gallery ? (
                <div className="bg-[#3A31C2] p-4 rounded-xl flex justify-center items-center">
                    <img src={img} alt={title} className="w-16 h-44" />
                </div>
            ) : (
                <img src={img} alt={title} className="w-20 h-auto object-cover rounded-lg" />
            )}
            <h2 className="font-bold text-xl mt-4">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="flex items-center mt-2">
                <FaUser className="text-gray-500" /> &nbsp;
                <span className="text-gray-700">{instructor}</span>
            </div>
            <hr className="my-2" />
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                    <RiGroupLine className="text-gray-500" />
                    <span className="text-gray-700 ml-2">
                        <CountUp start="0" end={studentNumber} />
                        &nbsp; نفر
                    </span>
                </div>
                <span className="text-[#4F986C]">{price} هزار تومان</span>
            </div>
        </div>
    );
}