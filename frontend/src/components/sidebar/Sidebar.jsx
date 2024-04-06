import { AddContact } from './AddContact';
import { Conversations } from './Conversations';
import { Requests } from './Requests';
import { Search } from './Search';
import { Settings } from './Settings';

export const Sidebar = () => {
    return (
        <div className='bg-zinc-300 border-r border-primary p-4 flex flex-col h-dvh overflow-hidden'>
            <Search />
            <div className='divider divider-primary px-3 mb-1' />
            <AddContact />
            <Requests />
            <div className='divider divider-primary px-3 mt-1' />
            <Conversations />
            <div className='divider divider-primary px-3 mt-1' />
            <Settings />
        </div>
    );
};
