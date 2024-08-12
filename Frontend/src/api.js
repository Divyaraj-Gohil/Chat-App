import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: 'https://chat-app-oymd.onrender.com/api/v1',
});
// Set up interceptor
api.interceptors.request.use(config => {
    // const token = Cookies.get('token');
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    const token = authUser.token
    //console.log(token)
    // Replace 'jwtToken' with your cookie name
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;