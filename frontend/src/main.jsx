import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { App } from './App.jsx';
import './index.css';
import { SocketContextProvider } from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
