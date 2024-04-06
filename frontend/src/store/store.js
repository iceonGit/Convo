import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { chatSlice } from './auth/chatSlice';
import { uiSlice } from './uiSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        ui: uiSlice.reducer,
    },
});
