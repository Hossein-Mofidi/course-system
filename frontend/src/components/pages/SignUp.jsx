import {Link} from "react-router-dom";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Helmet, HelmetProvider} from "react-helmet-async";


export default function SignUp() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>ثبت نام در برنامه نویس</title>
            </Helmet>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div
                    className="bg-white shadow-[0px_11px_200px_rgba(0,0,0,0.1)] rounded-[20px] p-6 md:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg">
                    <SignUpHeader/>
                    <SignUpForm/>
                    <SignUpFooter/>
                </div>
            </div>
        </HelmetProvider>
    )
}

function SignUpHeader() {
    return (
        <div className="flex flex-col items-center">
            <img src="/logo.svg" alt="لوگو" className="w-16 h-16 mt-4"/>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-4">ساخت حساب</h1>
            <p className="text-base md:text-lg text-gray-600 mt-2">عضو خانواده ما شو :)</p>
        </div>
    )
}

function SignUpFooter() {
    return (
        <p className="text-sm md:text-base text-gray-600 mt-6 text-center">
            حساب دارید؟ <Link to="/login" className="text-green-600 hover:underline">کلیک کنید</Link>
        </p>
    )
}

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [error, setError] = useState("")
    const [info, setInfo] = useState("")

    const signUpUrl = "http://localhost:8000/api/v1/users/create"

    const signUpMutation = useMutation({
        mutationFn: async (credentials) => {
            const formData = new URLSearchParams()
            formData.append("username", credentials.username)
            formData.append("password", credentials.password)

            const response = await fetch(signUpUrl, {
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
            setError("")
            setInfo("اکانت شما با موفقیت ساخته شد. لطفا وارد شوید.")
            console.log(data)
        },
        onError: (error) => {
            setError(error.message)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (!username || !password) {
            setError("لطفا نام کاربری و رمز عبور خود را وارد کنید.")
            return
        } else if (password !== passwordRepeat) {
            setError("تکرار رمز عبور با رمز عبور مغایرت دارد.")
            return;
        }

        signUpMutation.mutate({username, password})
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
            <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
                <div className="mb-4">
                    <input type="text"
                           placeholder="نام کاربری"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <PasswordBox value={password} setValue={setPassword} placeholder="رمز عبور"/>
                <PasswordBox value={passwordRepeat} setValue={setPasswordRepeat} placeholder="تکرار رمز عبور"/>

                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 text-sm md:text-base font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    ثبت نام
                </button>
            </form>
        </>
    )
}

// eslint-disable-next-line react/prop-types
function PasswordBox({value, setValue, placeholder}) {
    const [showPassword, setShowPassword] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mb-4 relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    )
}