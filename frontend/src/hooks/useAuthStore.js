import { useDispatch, useSelector } from 'react-redux';
import {
    checkingCredentials,
    login,
    logout,
    setProfilePic,
} from '../store/auth/authSlice';
import chatApi from '../api/chatApi';
import { logoutChat } from '../store/auth/chatSlice';
import { logoutUi } from '../store/uiSlice';
import { useChatStore } from './useChatStore';
import toast from 'react-hot-toast';
import { uploadPicture } from '../helpers/uploadPicture';

export const useAuthStore = () => {
    const { uid, status, username, profilePic, errorMessage } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const { getContacts, getRequests } = useChatStore();

    const startLogin = async ({ username, password }) => {
        dispatch(checkingCredentials());

        try {
            const newUsername = username.trim().toLowerCase();

            const { data } = await chatApi.post('/auth/login', {
                username: newUsername,
                password,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('profilePic', data.profilePic);
            localStorage.setItem('token-init-date', new Date().getTime());

            getContacts();
            getRequests();

            dispatch(
                login({
                    username: data.username,
                    uid: data.uid,
                    profilePic: data.profilePic,
                })
            );
        } catch (error) {
            dispatch(logout('Incorrect username or password'));
            setTimeout(() => {
                toast.error('Incorrect username or password');
            }, 100);
        }
    };

    const startSignUp = async ({
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
    }) => {
        dispatch(checkingCredentials());

        const newUsername = username.trim().toLowerCase();
        if (newUsername.length < 5) {
            toast.error('Username has to be at least 5 characters long');
            dispatch(logout('Error'));
            return;
        }

        if (password.length < 6) {
            toast.error('Password has to be at least 6 characters long');
            dispatch(logout('Error'));
            return;
        }

        if (password != confirmPassword) {
            toast.error('Passwords do not match');
            dispatch(logout('Error'));
            return;
        }

        try {
            const { data } = await chatApi.post('/auth/signup', {
                firstName,
                lastName,
                username: newUsername,
                password,
                confirmPassword,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // console.log(data);
            // console.log('helloworld');
            dispatch(
                login({
                    username: data.username,
                    uid: data.uid,
                    profilePic: data.profilePic,
                })
            );
        } catch (error) {
            dispatch(logout(error.response.data?.msg || 'Invalid form'));

            setTimeout(() => {
                toast.error('Invalid form');
            }, 100);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout());
        const profilePic = localStorage.getItem('profilePic');

        try {
            const { data } = await chatApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({ username: data.username, uid: data.uid, profilePic })
            );
            getContacts();
            getRequests();
        } catch (error) {
            localStorage.clear();
            dispatch(logout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(logout());
        dispatch(logoutChat());
        dispatch(logoutUi());
    };

    const startUploadingPicture = async (picture) => {
        try {
            const photoUrl = await uploadPicture(picture);
            await chatApi.post(`auth/pic`, {
                photoUrl,
            });

            dispatch(setProfilePic(photoUrl));
        } catch (error) {
            console.log(error);
        }
    };

    // console.log({uid,status,username,profilePic,errorMessage})
    return {
        // Props
        uid, status, username, profilePic, errorMessage,

        // Methods
        startLogin,
        startSignUp,
        checkAuthToken,
        startLogout,
        startUploadingPicture,
    };
};
