import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import io from 'socket.io-client';
import { useChatStore } from '../hooks/useChatStore';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { status, username } = useAuthStore();

    useEffect(() => {
        if (status == 'authenticated') {
            const socket = io('https://convo-50tn.onrender.com', {
                query: {
                    username,
                },
            });

            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [status,socket,username]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
