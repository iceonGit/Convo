import { useDispatch, useSelector } from 'react-redux';
import chatApi from '../api/chatApi';
import {
    setActiveConversation,
    setContacts,
    setMessages,
    setRequests,
} from '../store/auth/chatSlice';
import toast from 'react-hot-toast';
import notification from '../assets/notification.mp3';

export const useChatStore = () => {
    const { messages, activeConversation, isChatSelected, contacts, requests } =
        useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const getContacts = async () => {
        try {
            const { data } = await chatApi.get('users/');

            const contacts = [];

            data.map((element) => {
                contacts.push([element.username, element.profilePic]);
            });

            dispatch(setContacts(contacts));
        } catch (error) {
            console.log('Error getting contacts', error.message);
        }
    };

    const getRequests = async () => {
        try {
            const { data } = await chatApi.get('users/requests');

            dispatch(setRequests(data));
        } catch (error) {
            console.log('Error getting contacts', error.message);
        }
    };

    const getMessages = async (username) => {
        try {
            const { data } = await chatApi.get(`messages/${username}`);

            const messages = [];

            data.map((element) => {
                messages.push([
                    element.message,
                    element.senderId,
                    element.updatedAt,
                ]);
            });

            dispatch(setMessages(messages));
        } catch (error) {
            console.log('Error getting contacts', error.message);
        }
    };

    const selectConversation = async (username, profilePic) => {
        getMessages(username);
        dispatch(setActiveConversation([username, profilePic]));
    };

    const sendMessage = async (username, message) => {
        try {
            await chatApi.post(`messages/send/${username}`, {
                message,
            });
            getMessages(username);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.error);
        }
    };

    const sendRequest = async (username) => {
        try {
            await chatApi.post(`users/add/${username}`);
            toast.success('Request sent!');
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.error);
        }
    };

    const acceptRequest = async (username) => {
        try {
            await chatApi.post(`users/accept/${username}`);
            getContacts();
            getRequests();
            toast.success(`${username} added!`);
        } catch (error) {
            toast.error(error.response?.data?.error);
        }
    };

    const rejectRequest = async (username) => {
        try {
            await chatApi.post(`users/reject/${username}`);
            getRequests();
            toast.success(`${username} rejected`);
        } catch (error) {
            toast.error(error.response?.data?.error);
        }
    };

    const newMsg = (message, senderUsername) => {
        toast(`New message from ${senderUsername}`);
        const sound = new Audio(notification);
        sound.play();

        if (senderUsername != activeConversation[0]) {
            return;
        }

        const newMessages = [
            ...messages,
            [message.message, message.senderId, message.updatedAt],
        ];
        dispatch(setMessages(newMessages));
    };

    return {
        // Props
        messages,
        activeConversation,
        isChatSelected,
        requests,
        contacts,

        // Methods
        getContacts,
        getMessages,
        selectConversation,
        sendMessage,
        getRequests,
        acceptRequest,
        rejectRequest,
        sendRequest,
        newMsg,
    };
};
