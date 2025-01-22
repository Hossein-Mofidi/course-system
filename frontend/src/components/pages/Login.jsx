import {Helmet} from "react-helmet";
import {useState} from "react";
import eyeslash from "../../assets/icons/eye-slash.svg"
import Alert from "@mui/material/Alert";
import {useMutation} from "@tanstack/react-query";
import {Link} from "react-router-dom";


export default function Login() {
    return (
        <>
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
        </>
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
                console.log(response)
                throw new Error("ورود ناموفق بود");
            }

            return response.json()
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.access_token)
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

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="نام کاربری (ایمیل)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#F1F1F1] px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6 relative">
                    <input
                        type="password"
                        placeholder="رمز عبور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F1F1F1] px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="absolute inset-y-0 left-3 flex items-center">
                        <img src={eyeslash} alt="نمایش رمز"
                             className="w-5 h-5 text-gray-400 hover:text-gray-600"/>
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