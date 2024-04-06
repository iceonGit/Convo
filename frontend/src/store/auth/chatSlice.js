import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        isChatSelected: false,
        isLoadingMessages: true,
        activeConversation: null,
        messages: [],
        contacts: [],
        requests: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
            state.isChatSelected = true;
        },
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        logoutChat: (state) => {
            state.isChatSelected = false;
            state.isLoadingMessages = true;
            state.activeConversation = null;
            state.messages = [];
            state.contacts = [];
            state.requests = [];
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const {
    setMessages,
    setActiveConversation,
    setContacts,
    setRequests,
    logoutChat,
    clearMessages,
} = chatSlice.actions;
