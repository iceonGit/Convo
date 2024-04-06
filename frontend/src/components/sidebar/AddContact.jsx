import { IoMdPersonAdd } from 'react-icons/io';
import { useForm } from '../../hooks/useForm';
import { useChatStore } from '../../hooks/useChatStore';
import toast from 'react-hot-toast';

const initalForm = {
    username: '',
};

export const AddContact = () => {
    const { username, onInputChange, onResetForm } = useForm(initalForm);
    const { sendRequest } = useChatStore();

    const handleAdd = () => {
        if (username === '') {
            toast('Please enter username to add');
            return;
        }

        sendRequest(username);
        onResetForm();
    };

    return (
        <>
            <button
                className='bg-zinc-300 text-black hover:text-white'
                onClick={() => document.getElementById('add_modal').showModal()}
            >
                <div className='flex gap-2 items-center rounded-xl p-2 py-1 cursor-pointer hover:bg-lime-500'>
                    <IoMdPersonAdd className='w-8 h-8' />
                    <p className='font-semibold'>Add a new Contact</p>
                </div>
            </button>

            <div>
                <dialog id='add_modal' className='modal'>
                    <div className='modal-box bg-secondary flex flex-col font-bold text-xl text-center text-black'>
                        <span>Add a new Contact</span>
                        <span className='text-lg'>
                            Type the username of your new contact below
                        </span>

                        <div className='modal-action justify-center'>
                            <form method='dialog'>
                                <input
                                    type='text'
                                    className='border text-sm rounded-lg block w-[300px] p-2.5 bg-secondary text-black border-primary mb-4'
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={onInputChange}
                                />

                                <div className='flex justify-end'>
                                    <button className='w-[60px] rounded-2xl btn'>
                                        Cancel
                                    </button>

                                    <button
                                        className='w-[60px] btn rounded-2xl ml-4'
                                        onClick={handleAdd}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
};
