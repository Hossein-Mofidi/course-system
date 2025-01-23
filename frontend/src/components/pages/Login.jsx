import {Helmet, HelmetProvider} from "react-helmet-async";
import {useState} from "react";
import Alert from "@mui/material/Alert";
import {useMutation} from "@tanstack/react-query";
import {Link, useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";


export default function Login() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>ورود به برنامه نویس</title>
            </Helmet>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="bg-white shadow-2xl rounded-[1.25rem] p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <LoginHeader />
                    <LoginForm />
                    <LoginFooter />
                </div>
            </div>
        </HelmetProvider>
    )
}

function LoginHeader() {
    return (
        <div className="flex flex-col items-center mb-8">
            <img src="/logo.svg" alt="لوگو" className="w-16 h-auto mb-4"/>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">ورود به اکانت</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2">خوش برگشتی :)</p>
        </div>
    )
}

function LoginFooter() {
    return (
        <p className="text-center text-sm sm:text-base text-gray-600 mt-6">
            حساب ندارید؟ <Link to="/signup" className="text-green-600 hover:underline">کلیک کنید</Link>
        </p>
    )
}

function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [info, setInfo] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate()
    const loginUrl = "http://localhost:8000/api/v1/users/token"

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const formData = new URLSearchParams()
            formData.append("grant_type", "password")
            formData.append("username", credentials.username)
            formData.append("password", credentials.password)

            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("ورود ناموفق بود");
            }

            return response.json()
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.access_token)
            setError("")
            setInfo("با موفقیت وارد شدید")
            navigate("/")
        },
        onError: (error) => {
            setError(error.message)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (!username || !password) {
            setError("لطفا نام کاربری و رمز عبور خود را وارد کنید")
            return
        }

        loginMutation.mutate({username, password})
    }

    return (
        <>
            {error && (
                <Alert severity="error" variant="filled" className="mb-4">
                    {error}
                </Alert>
            )}

            {info && (
                <Alert severity="info" variant="filled" className="mb-4">
                    {info}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="نام کاربری"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#F1F1F1] px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F1F1F1] px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 left-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered ? (
                            showPassword ? (
                                <FaEyeSlash size={24} className="text-blue-500"/>
                            ) : (
                                <FaEye size={24} className="text-blue-500"/>
                            )
                        ) : showPassword ? (
                            <FaEyeSlash size={24} className="text-gray-500"/>
                        ) : (
                            <FaEye size={24} className="text-gray-500"/>
                        )}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    ورود
                </button>
            </form>
        </>
    )
}