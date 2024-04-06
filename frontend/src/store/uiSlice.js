import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        view: 'messages',
    },
    reducers: {
        setMessagesView: (state) => {
            state.view = 'messages';
        },
        setRequestsView: (state) => {
            state.view = 'requests';
        },
        logoutUi: (state) => {
            state.view = 'messages';
        },
    },
});

export const { setMessagesView, setRequestsView, logoutUi } = uiSlice.actions;
