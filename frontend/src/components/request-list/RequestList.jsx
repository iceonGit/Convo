import { IoChevronBack } from 'react-icons/io5';
import { RequestSingular } from './RequestSingular';
import { useChatStore } from '../../hooks/useChatStore';

const HasNoRequests = () => {
    return (
        <div className='flex flex-col items-center justify-center px-4 text-center text-white font-bold text-xl gap-2 h-dvh'>
            <span>You have no pending requests</span>
            <label
                htmlFor='drawer-sidebar'
                className='btn btn-primary drawer-button md:hidden mt-4'
            >
                <IoChevronBack className='w-8 h-8' />
            </label>
        </div>
    );
};

const HasRequests = () => {
    const { requests } = useChatStore();

    return (
        <>
            <div className='bg-emerald-800 px-4 py-4 mb-2 flex items-center'>
                <label
                    htmlFor='drawer-sidebar'
                    className='btn btn-primary drawer-button md:hidden'
                >
                    <IoChevronBack className='w-8 h-8' />
                </label>
                <span className='font-sans-serif text-white'>Pending Requests</span>
            </div>

            <div className='flex flex-col items-center px-4 flex-1 mt-2 overflow-y-auto overflow-x-hidden'>
                {requests?.map((user) => (
                    <RequestSingular key={user} req={user} />
                ))}
            </div>
        </>
    );
};

export const RequestList = () => {
    // Receive from global state
    const reqs = ['Lautrec', 'Oswald', 'Leonhard'];

    return (
        <div className='flex flex-col w-lvw h-dvh'>
            {reqs.length == 0 ? <HasNoRequests /> : <HasRequests />}
        </div>
    );
};
