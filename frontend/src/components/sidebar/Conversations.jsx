import { useSelector } from 'react-redux';
import { ConversationSingular } from './ConversationSingular';

export const Conversations = () => {
    const { contacts } = useSelector((state) => state.chat);
    const hasContacts = contacts.length > 0;
    return (
        <>
            {hasContacts ? (
                <div className='py-2 flex flex-col overflow-auto mb-2'>
                    {contacts.map((contact) => (
                        <ConversationSingular
                            key={contact[0]}
                            contact={contact}
                        />
                    ))}
                </div>
            ) : (
                <div className='flex gap-2 items-center text-start rounded-xl p-2 py-1  text-black'>
                    <div className='flex flex-col flex-1'>
                        <p className='font-bold text-center'>
                            Add contacts to start messaging!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
