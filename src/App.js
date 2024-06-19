import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import SugarLevel from "./Pages/SugarLevel/SugarLevel";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import PrivateRoute from './Services/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/sugar-level",
        element: <PrivateRoute element={<SugarLevel />} />,
    },
    {
        path: "/profile",
        element: <PrivateRoute element={<Profile />} />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/registration",
        element: <Registration />,
    },
]);

function App() {
    return (
            <RouterProvider router={router} />
    );
}

export default App;