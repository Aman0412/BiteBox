import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Only try to refresh if there's actually a refresh token stored
        if (error.response.status === 401 && !originalRequest._retry && localStorage.getItem(REFRESH_TOKEN)) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            try {
                const res = await api.post("/auth/jwt/refresh/", {
                    refresh: refreshToken,
                });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    api.defaults.headers.common["Authorization"] = `JWT ${res.data.access}`;
                    originalRequest.headers["Authorization"] = `JWT ${res.data.access}`;
                    return api(originalRequest);
                }
            } catch (err) {
                // Clear tokens on refresh failure
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                console.log(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;