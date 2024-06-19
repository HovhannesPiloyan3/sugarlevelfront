import axios from "axios";
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: "http://31.128.40.71:5000/",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['authorization'] = `${token}`;
        }
        // Добавление заголовка ngrok-skip-browser-warning
        config.headers['ngrok-skip-browser-warning'] = 'true';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const navigate = useNavigate();
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;