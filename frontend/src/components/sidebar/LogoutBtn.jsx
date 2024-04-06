import { BiLogOut } from 'react-icons/bi';
import { useAuthStore } from '../../hooks/useAuthStore';

export const LogoutBtn = () => {
    const { startLogout } = useAuthStore();

    const handleLogout = () => {
        startLogout();
    };

    return (
        <button
            className='flex gap-2 items-center rounded-xl p-2 py-1 cursor-pointer hover:bg-lime-500 text-black hover:text-white w-full'
            onClick={handleLogout}
        >
            <BiLogOut className='w-10 h-10 cursor-pointer' />

            <p className='font-semibold'>Logout</p>
        </button>
    );
};
