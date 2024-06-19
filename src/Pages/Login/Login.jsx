import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../Features/authSlice/authSlice';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Logo from '../../Assets/Images/Logo/logo.png';

const Login = () => {
    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("auth/login",
                JSON.stringify({ username: login, password: pwd }),
                { headers: { 'Content-Type': 'application/json' } }

            );
            dispatch(loginSuccess(response.data));
            navigate('/'); // Перенаправление на главную страницу после успешного логина
        } catch (error) {
            console.error("Error response:", error.response);
            if (error.response) {
                // Сервер ответил с ошибкой
                dispatch(loginFailure(error.response.data.message));
                setError(error.response.data.message);
            } else if (error.request) {
                // Запрос был сделан, но ответа нет
                setError('No response from server. Please try again later.');
            } else {
                // Произошла ошибка при настройке запроса
                setError('Error occurred. Please try again.');
            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex text-2xl items-center mb-6 text-black font-bold dark:text-white">
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    qss800
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Войдите в свой аккаунт
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <div>
                                <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Твой Логин
                                </label>
                                <input type="text" name="login" id="login"
                                       value={login}
                                       onChange={(e) => setLogin(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required autoComplete="username" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       value={pwd}
                                       onChange={(e) => setPwd(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required autoComplete="current-password" />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Войти
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                У вас еще нет учетной записи?
                                <Link to="/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Зарегистрироваться </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
