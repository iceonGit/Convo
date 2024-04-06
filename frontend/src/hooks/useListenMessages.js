import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useChatStore } from './useChatStore';

export const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { newMsg, messages } = useChatStore();

    useEffect(() => {
        socket?.on('newMessage', (newMessage, senderUsername) => {
            newMsg(newMessage, senderUsername);
        });

        return () => socket?.off('newMessage');
    }, [socket, messages]);
};
