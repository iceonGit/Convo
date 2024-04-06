import { IoSearch } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useForm } from '../../hooks/useForm';
import { useChatStore } from '../../hooks/useChatStore';

const initialState = {
    search: '',
};

export const Search = () => {
    const { search, onInputChange, onResetForm } = useForm(initialState);
    const { contacts, selectConversation } = useChatStore();

    const handleSubmit = (event) => {
        event.preventDefault();
        onResetForm();

        let found = false;
        contacts.forEach((contact) => {
            if (contact[0] == search) {
                found = true;
                document.getElementById('drawer-sidebar').checked = false;
                return selectConversation(contact[0], contact[1]);
            }
        });

        if (!found) {
            return toast.error('Username not in your contacts');
        }
    };

    return (
        <form className='flex items-center gap-2 mt-4' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search a conversation'
                className='input input-bordered rounded-full input-primary bg-secondary text-black'
                name='search'
                value={search}
                onChange={onInputChange}
            ></input>
            <button
                type='submit'
                className='btn btn-circle btn-primary text-slate-100 bg-lime-500 hover:bg-lime-600 outline-emerald-900'
            >
                <IoSearch className='w-6 h-6 outline-none' />
            </button>
        </form>
    );
};
