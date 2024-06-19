import React, { useEffect, useState } from 'react';
import Wallpaper from "../../Components/Wallpaper/Wallpaper";
import ChartCustom from "../../Components/Ui/ChartCustom/ChartCustom";
import axiosInstance from "../../api/axiosInstance";

const SugarLevel = (props) => {
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ date: '', hour: '', level: '' });
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchSugarLevelsDates = async () => {
            try {
                const response = await axiosInstance.get('user/sugarLevelsDates');
                setCurrentDate(response.data);
                if (response.data.length > 0) {
                    setSelectedDate(response.data[0]);
                }
            } catch (error) {
                setError("Не удалось загрузить даты");
            } finally {
                setLoading(false);
            }
        };
        fetchSugarLevelsDates();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    const fetchData = async (date) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('user/dailySugarLevels', {
                params: { date }
            });
            setData(response.data);
        } catch (error) {
            setError("Не удалось загрузить данные для выбранной даты");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddData = async (e) => {
        e.preventDefault();
        const combinedData = {
            date: formData.date,
            hour: formData.hour,
            level: formData.level,
        };
        try {
            await axiosInstance.post('user/addSugarLevel', combinedData);
            setFormData({ date: '', hour: '', level: '' });
            const response = await axiosInstance.get('user/sugarLevelsDates');
            setCurrentDate(response.data);
            fetchData(selectedDate);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <Wallpaper>
            <div className="flex flex-col items-center p-4 dark:bg-black">
                <form onSubmit={handleAddData} className="w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="hour">
                            Time
                        </label>
                        <input
                            type="time"
                            id="hour"
                            name="hour"
                            value={formData.hour}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="level">
                            Sugar Level Value
                        </label>
                        <input
                            type="number"
                            id="level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="2"
                            max="24"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Добавить уровень сахара
                        </button>
                    </div>
                </form>
                <div className="mb-4 mt-4">
                    <label htmlFor="date-select" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Выберите дату</label>
                    <select
                        id="date-select"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a date</option>
                        {currentDate?.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-8 w-full">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>{error}</p>
                    ) : (
                        <ChartCustom data={data} />
                    )}
                </div>
            </div>
        </Wallpaper>
    );
};

export default SugarLevel;
