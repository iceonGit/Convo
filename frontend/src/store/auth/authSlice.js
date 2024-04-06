import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        username: null,
        profilePic: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.profilePic = payload.profilePic;
            state.username = payload.username;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.username = null;
            state.uid = null;
            state.profilePic = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        setProfilePic: (state, { payload }) => {
            state.profilePic = payload;
        },
    },
});

export const {
    login,
    logout,
    checkingCredentials,
    clearErrorMessage,
    setProfilePic,
} = authSlice.actions;
