import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Helmet, HelmetProvider} from "react-helmet-async";

export default function CreateCourse() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");

    // states for form items
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration_hours, setDurationHours] = useState("");
    const [session_count, setSessionCount] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [price, setPrice] = useState("");

    const addUrl = `http://localhost:8000/api/v1/courses/create`;

    const mutation = useMutation({
        mutationFn: async (data) => {
            const formData = new URLSearchParams()
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("prerequisites", data.prerequisites);
            formData.append("session_count", data.session_count);
            formData.append("duration_hours", data.duration_hours);

            const response = await fetch(addUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("ایجاد دوره ناموفق بود");
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["courses"]);
            navigate("/admin/courses");
        },
        onError: (error) => {
            console.error("خطا در ایجاد دوره:", error);
            alert("خطا در ایجاد دوره: " + error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            duration_hours: parseInt(duration_hours),
            session_count: parseInt(session_count),
            prerequisites,
            price: parseInt(price),
        };

         console.log("Data being sent:", data);

        mutation.mutate(data);
    };

    const formItems = [
        {
            title: "عنوان دوره",
            value: title,
            setValue: setTitle,
        },
        {
            title: "توضیحات دوره",
            value: description,
            setValue: setDescription,
        },
        {
            title: "مدت زمان دوره (ساعت)",
            value: duration_hours,
            setValue: setDurationHours,
        },
        {
            title: "تعداد جلسات دوره",
            value: session_count,
            setValue: setSessionCount,
        },
        {
            title: "پیشنیاز دوره",
            value: prerequisites,
            setValue: setPrerequisites,
        },
        {
            title: "قیمت دوره (تومان)",
            value: price,
            setValue: setPrice,
        },
    ];

    return (
        <HelmetProvider>
            <Helmet>
                <title>افزودن دوره</title>
            </Helmet>
            <div className="p-8">
                <h1 className="text-2xl font-medium font-modam text-center mb-12">
                    افزودن دوره
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formItems.map((item, index) => (
                        <FormItem
                            key={index}
                            title={item.title}
                            value={item.value}
                            setValue={item.setValue}
                        />
                    ))}
                    <div className="flex gap-5 justify-center">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/courses")}
                            className="text-white bg-red-600 hover:bg-red-700 transition-colors px-11 py-3 rounded-md"
                        >
                            بازگشت
                        </button>
                        <button
                            type="submit"
                            className="bg-[#3A31C2] text-white px-8 py-3 rounded-md hover:bg-[#2a238f] transition-colors"
                        >
                            افزودن دوره
                        </button>
                    </div>
                </form>
            </div>
        </HelmetProvider>
    );
}

// eslint-disable-next-line react/prop-types
function FormItem({title, value, setValue}) {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-[60vw] border bg-[#F1F1F1] p-3 rounded-xl mx-auto block"
                required={title !== "شناسه مربی (اختیاری)"}
                placeholder={title}
            />
        </div>
    );
}