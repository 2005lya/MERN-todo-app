import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
})

axiosInstance.interceptors.request.use(
    (config) => {
        // You can add any custom logic here before the request is sent
        // For example, you can add an authorization token if needed
        const token = localStorage.getItem("token");
        console.log("Token sent in Authorization header:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // You can add any custom logic here before the response is returned
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login page
            console.error("Unauthorized access - redirecting to login");
            localStorage.removeItem("token");
            window.location.href = "/login"; // Adjust the path as needed
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;