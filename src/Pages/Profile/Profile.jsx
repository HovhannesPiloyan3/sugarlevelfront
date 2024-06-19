import React, {useEffect, useState} from 'react';
import Wallpaper from "../../Components/Wallpaper/Wallpaper";
import Avatar from '../../Assets/Images/svg/profile.svg';
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import {getUser, logout, userError} from "../../Features/authSlice/authSlice";
import './Profile.scss';

const Profile = () => {
    const [dark, setDark] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/user/profile');
                console.log(response.data);
                dispatch(getUser(response.data));
            } catch (err) {
                dispatch(userError(err.message));
            }
        }
        fetchUser();
    }, [dispatch]);

    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(logout())
        window.location.reload();
    };
    const handleDarkModeChange = () => {
        setDark(!dark)
        document.body.classList.toggle("dark");
    }

    return (
        <Wallpaper>
            <main className=" sm:p-8 p-0 dark:bg-black">
                <div className="profile dark:bg-black">
                    <div className="profile-container">
                        <div className="profile-container-avatar-container ">
                            <img className="profile-avatar dark:text-white  dark:bg-gray-900" src={Avatar} width="100px" alt="profile"/>
                            <p className="profile-text dark:text-white dark:bg-gray-900">Имя Пользователя: {user?.username}</p>
                            <p className="profile-text dark:text-white dark:bg-gray-900">Email: {user?.email}</p>
                            <p className="profile-text dark:text-white dark:bg-gray-900">Тип Диабета: {user?.diabetesType}</p>
                            <p className="profile-text dark:text-white dark:bg-gray-900">ФИО: {user?.fullName}</p>
                        </div>
                        <div className="flex w-full justify-center flex-col lg:flex-row">
                            <button onClick={handleLogout}
                                    className="profile-btn sm:text-2xl text-lg mt-5 lg:m-7 p-7 w-full lg:w-max dark:text-white dark:bg-gray-900">
                                Выход из Профиля
                            </button>
                            <button className="profile-btn sm:text-2xl text-lg mt-5 lg:m-7 p-7 w-full lg:w-max dark:text-white dark:bg-gray-900 " onClick={handleDarkModeChange}>
                                {dark ?
                                <span>Темный режим</span> :
                                <span>Светлый режим</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Wallpaper>
    );
};

export default Profile;
