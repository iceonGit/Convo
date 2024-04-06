import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signup/SignUp';
import { Loading } from './components/ui/Loading';
import { useEffect } from 'react';
import { useAuthStore } from './hooks/useAuthStore';

export const App = () => {
    const { checkAuthToken, status } = useAuthStore();
    const auth = status === 'authenticated';

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status == 'checking') {
        return <Loading />;
    }

    return (
        <>
            <div className='h-dvh flex items-center justify-center'>
                <Routes>
                    <Route
                        path='/'
                        element={auth ? <Home /> : <Navigate to={'/login'} />}
                    />
                    <Route
                        path='/login'
                        element={auth ? <Navigate to={'/'} /> : <Login />}
                    />
                    <Route
                        path='/signup'
                        element={auth ? <Navigate to={'/'} /> : <SignUp />}
                    />
                </Routes>
                <Toaster />
            </div>
        </>
    );
};
