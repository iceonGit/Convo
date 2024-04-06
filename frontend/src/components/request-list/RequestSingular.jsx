import { useChatStore } from '../../hooks/useChatStore';

export const RequestSingular = ({ req }) => {
    const { acceptRequest, rejectRequest } = useChatStore();

    const handleAccept = () => {
        acceptRequest(req);
    };

    const handleReject = () => {
        rejectRequest(req);
    };

    return (
        <div className='bg-zinc-700 w-[90vw] sm:w-[460px] lg:w-[700px] xl:w-[900px] rounded-xl  px-4 py-4 mb-2 mx-auto flex items-center justify-end'>
            <span className='text-white text-xl font-semibold mr-auto'>
                {req}
            </span>

            <div className='flex justify-end items-end'>
                <button
                    className='btn bg-lime-600 hover:bg-lime-500 btn-base-100 flex gap-2 items-center rounded-4xl p-2 py-1 text-white mr-2'
                    onClick={() =>
                        document
                            .getElementById(`accept_modal_${req}`)
                            .showModal()
                    }
                >
                    <p className='font-semibold'>Accept</p>
                </button>

                <dialog id={`accept_modal_${req}`} className='modal'>
                    <div className='modal-box bg-secondary flex flex-col font-bold text-xl text-center text-black'>
                        <span>Accept contact request from {req}?</span>

                        <div className='modal-action justify-center'>
                            <form method='dialog'>
                                <div className='flex justify-end'>
                                    <button className='w-[60px] btn rounded-4xl'>
                                        Cancel
                                    </button>

                                    <button
                                        className='w-[60px] btn btn-primary rounded-4xl ml-4'
                                        onClick={handleAccept}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>

                <button
                    className='btn btn-secondary btn-base-1 00 flex gap-2 items-center rounded-4xl p-auto mx-1 text-slate-800'
                    onClick={() =>
                        document.getElementById(`deny_modal_${req}`).showModal()
                    }
                >
                    <p className='font-semibold'>Deny</p>
                </button>

                <dialog id={`deny_modal_${req}`} className='modal'>
                    <div className='modal-box bg-secondary flex flex-col font-bold text-xl text-center text-black'>
                        <span>Deny contact request from {req}?</span>

                        <div className='modal-action justify-center'>
                            <form method='dialog'>
                                <div className='flex justify-end'>
                                    <button className='w-[60px] btn rounded-4xl'>
                                        Cancel
                                    </button>

                                    <button
                                        className='w-[60px] btn btn-primary rounded-4xl ml-4'
                                        onClick={handleReject}
                                    >
                                        Deny
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};
