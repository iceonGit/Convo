import { useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useAuthStore } from '../../hooks/useAuthStore';

export const ChangeProfilePic = () => {
    const fileInputRef = useRef();
    const { profilePic, startUploadingPicture } = useAuthStore();

    console.log(profilePic);
    const handleFileUpload = ({ target }) => {
        if (target.files.length === 0) return;

        startUploadingPicture(target.files[0]);
    };

    return (
        <>
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />

            <button
                className='flex mb-3 gap-2 items-center rounded-xl p-2 py-1 cursor-pointer hover:bg-lime-500 text-black hover:text-white'
                onClick={() => fileInputRef.current.click()}
            >
                <div className='avatar'>
                    <div className='w-10 h-10 rounded-full'>
                        <img src={profilePic} alt='user profile picture' />
                    </div>
                </div>

                <p className='font-semibold'>Change profile picture</p>
            </button>
        </>
    );
};
