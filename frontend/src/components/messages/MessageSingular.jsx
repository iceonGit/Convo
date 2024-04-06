import { useAuthStore } from '../../hooks/useAuthStore';
import { useChatStore } from '../../hooks/useChatStore';

export const MessageSingular = ({ msg, uid }) => {
    const mine = msg[1] === uid;
    const time = new Date(msg[2]).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
    });
    const { profilePic } = useAuthStore();
    const { activeConversation } = useChatStore();

    // console.log(useAuthStore);
    return (
        <div className={`chat ${mine ? 'chat-end' : 'chat-start'}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        src={mine ? profilePic : activeConversation[1]}
                        alt='user profile picture'
                    />
                </div>
            </div>

            <div
                className={`chat-bubble text-white ${
                    mine ? ' bg-emerald-800' : 'bg-gray-600'
                } break-words`}
            >
                {msg[0]}
            </div>
            <div className='chat-footer opacity-80 text-xs flex gap-1 items-center text-white'>
                {time}
            </div>
        </div>
    );
};
