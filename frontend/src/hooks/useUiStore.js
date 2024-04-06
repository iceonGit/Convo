import { useDispatch, useSelector } from 'react-redux';
import { setMessagesView, setRequestsView } from '../store/uiSlice';
import { clearMessages } from '../store/auth/chatSlice';

export const useUiStore = () => {
    const { view } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const setReqsView = () => {
        dispatch(setRequestsView());
        dispatch(clearMessages());
    };

    const setMsgsView = () => {
        dispatch(setMessagesView());
    };

    return {
        //props
        view,

        //methods
        setReqsView,
        setMsgsView,
    };
};
