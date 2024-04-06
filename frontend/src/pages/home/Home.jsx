import { MessageContainer } from '../../components/messages/MessageContainer';
import { RequestList } from '../../components/request-list/RequestList';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useUiStore } from '../../hooks/useUiStore';

export const Home = () => {
    const { view } = useUiStore();

    return (
        <div className='drawer md:drawer-open'>
            <input
                id='drawer-sidebar'
                type='checkbox'
                className='drawer-toggle'
            />
            <div className='drawer-content flex overflow-hidden bg-base-100'>
                {view == 'messages' ? <MessageContainer /> : <RequestList />}
            </div>

            <div className='drawer-side'>
                <label
                    htmlFor='drawer-sidebar'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <Sidebar />
            </div>
        </div>
    );
};
