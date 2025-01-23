import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Admin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const checkAdminUrl = "http://localhost:8000/api/v1/users/check-admin"

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/notfound");
            return;
        }

        setIsLoading(true)

        axios.get(checkAdminUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data["isAdmin"]) {
                    navigate("/admin/users");
                } else {
                    navigate("/notfound");
                }
            })
            .catch(error => {
                console.error("خطا در بررسی نقش کاربر:", error);
                navigate("/login");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [navigate]);

    if (isLoading) {
        return <div>در حال بررسی دسترسی...</div>;
    }

    return null;
}