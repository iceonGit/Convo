import React, { useEffect, useRef } from 'react';

import { useAuthStore } from '../../hooks/useAuthStore';
import { useChatStore } from '../../hooks/useChatStore';
import { MessageSingular } from './MessageSingular';
import { useListenMessages } from '../../hooks/useListenMessages';

export const Messages = () => {
    const { messages } = useChatStore();

    useListenMessages();

    const { uid } = useAuthStore();

    const messagesEndRef = useRef(null);

    // Automatically scroll to the bottom when entering a conversation or adding messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='px-4 flex-1 mt-2 overflow-y-auto overflow-x-hidden'>
            {messages.map((msg) => (
                <MessageSingular key={msg} msg={msg} uid={uid} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};
