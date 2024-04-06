import { IoMdSettings } from 'react-icons/io';
import { LogoutBtn } from './LogoutBtn';
import { ChangeProfilePic } from './ChangeProfilePic';
import { useAuthStore } from '../../hooks/useAuthStore';

export const Settings = () => {
    const { username, profilePic } = useAuthStore();
    return (
        <>
            <button
                className='flex mt-auto gap-2 items-center p-2 py-1 cursor-pointer hover:bg-lime-500 rounded-xl text-black hover:text-white'
                onClick={() =>
                    document.getElementById('settings_modal').showModal()
                }
            >
                <div className='flex gap-2 items-center p-2 py-1 cursor-pointer'>
                    <IoMdSettings className='w-8 h-8' />
                    <p className='font-semibold'>Settings</p>
                </div>
            </button>

            <div>
                <dialog id='settings_modal' className='modal'>
                    <div className='modal-box bg-secondary flex flex-col font-bold text-xl text-center text-black'>
                        <div className='modal-action justify-center items-center w-full'>
                            <form method='dialog'>
                                <span className='text-2xl'>
                                    Hi, {username}!
                                </span>
                                <div className='divider divider-primary px-3 mt-4' />

                                <ChangeProfilePic />
                                <div className='divider divider-primary px-3 mt-1' />

                                <LogoutBtn />
                                <div className='divider divider-primary px-3 mt-1' />

                                <button className='w-[60px] btn'>
                                    Back
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
};
