import Tabs from "./Tabs.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import {Helmet, HelmetProvider} from "react-helmet-async";

export default function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const courseUrl = "http://localhost:8000/api/v1/courses/";

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(courseUrl);
                if (!response.ok) {
                    throw new Error("خطا در دریافت داده‌ها");
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [courseUrl]);

    const handleDeleteCourse = (courseId) => {
        setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== courseId)
        );
    };

    const handleEdit = (id) => {
        navigate(`/admin/courses/edit/${id}`);
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>لیست دوره ها</title>
            </Helmet>
            <div className="relative flex flex-col sm:flex-row gap-5 sm:gap-[40vw] top-10 mx-auto w-[90vw]">
                <Tabs/>
                <button
                    onClick={() => navigate("/admin/courses/add")}
                    className="bg-[#4F986C] hover:bg-[#3B8D5C] transition-colors rounded-md h-10 w-full sm:w-[9rem] text-white font-medium mt-4"
                >
                    افزودن دوره
                </button>
            </div>

            <div className="mt-20">
                {loading ? (
                    <div className="text-center text-lg font-medium">در حال بارگذاری...</div>
                ) : error ? (
                    <Alert severity="error" variant="filled" className="block mx-auto w-full sm:w-[25rem]">
                        {error}
                    </Alert>
                ) : courses.length === 0 ? (
                    <Alert severity="info" variant="filled" className="block mx-auto w-full sm:w-[25rem]">
                        هیچ دوره‌ای وجود ندارد.
                    </Alert>
                ) : (
                    courses.map((course) => (
                        <Course
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            onDelete={handleDeleteCourse}
                            setError={setError}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>

            <button
                className="bg-[#E02B2B] transition-colors hover:bg-[#c82333] text-white rounded-xl h-10 w-40 mx-auto block mt-10"
                onClick={() => navigate("/")}
            >
                بازگشت به صفحه اصلی
            </button>
        </HelmetProvider>
    );
}

// eslint-disable-next-line react/prop-types
function Course({id, title, onDelete, setError, onEdit}) {
    const deleteUrl = "http://localhost:8000/api/v1/courses/delete/" + id;
    const token = localStorage.getItem("token");

    async function deleteCourse() {
        const isConfirmed = window.confirm(`آیا از حذف دوره "${title}" مطمئن هستید؟`);

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("خطا در حذف دوره");
            }

            onDelete(id);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div
            className="flex flex-col sm:flex-row justify-between items-center bg-white h-auto sm:h-[6rem] mx-auto w-full sm:w-[80vw] p-4 rounded-lg my-4">
            <h2 className="text-lg font-medium mb-4 sm:mb-0">{title}</h2>
            <div className="flex gap-3">
                <button
                    onClick={() => onEdit(id)}
                    className="bg-[#3A31C2] text-white rounded-md w-[6.5rem] h-11 hover:bg-[#2a238f] transition-colors"
                >
                    ویرایش دوره
                </button>
                <button
                    onClick={deleteCourse}
                    className="bg-[#E02B2B] text-white rounded-md w-[6.5rem] h-11 hover:bg-[#c82333] transition-colors"
                >
                    حذف دوره
                </button>
            </div>
        </div>
    );
}