import { useSocketContext } from '../../context/SocketContext';
import { useChatStore } from '../../hooks/useChatStore';
import { useUiStore } from '../../hooks/useUiStore';

export const ConversationSingular = ({ contact }) => {
    const [username, profilePic] = contact;
    const { selectConversation } = useChatStore();
    const { setMsgsView } = useUiStore();

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(username);

    const handleClick = () => {
        document.getElementById('drawer-sidebar').checked = false;

        selectConversation(username, profilePic);
        setMsgsView();
    };

    return (
        <>
            <button
                className='flex gap-2 items-center text-start rounded-xl p-2 py-1 cursor-pointer hover:bg-lime-500 text-black hover:text-white'
                onClick={handleClick}
            >
                <div
                    className={`avatar mr-2 ${isOnline ? 'online' : 'offline'}`}
                >
                    <div className='w-12 rounded-full'>
                        <img src={profilePic} alt='user profile picture' />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p className='font-bold'>{username}</p>
                </div>
            </button>

            <div className='divider my-0 py-0 h-1' />
        </>
    );
};
