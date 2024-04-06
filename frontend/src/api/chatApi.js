import axios from 'axios';

const api_url = 'https://convo-50tn.onrender.com/api';

const chatApi = axios.create({
    baseURL: api_url,
});

chatApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    };

    return config;
});

export default chatApi;
