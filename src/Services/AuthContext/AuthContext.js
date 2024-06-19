import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    const login = () => {
        // Ваша логика логина
        setIsAuthenticated(true);
        localStorage.setItem('authToken', 'your-token'); // Пример
    };

    const logout = () => {
        // Ваша логика логаута
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);