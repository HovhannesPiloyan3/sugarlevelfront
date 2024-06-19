import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('authToken'),
        user: null,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('authToken', action.payload.token);
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('authToken', action.payload.token);
        },
        registerFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('authToken');
        },
        getUser: (state, action) => {
            state.user = action.payload;
        },
        userError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure, logout,getUser,userError } = authSlice.actions;
export default authSlice.reducer;
