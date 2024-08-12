import axios from 'axios';
import Cookies from 'js-cookie'; // or your preferred cookie library

// Create Axios instance
const api = axios.create({
    baseURL: 'https://temp-7grl.onrender.com/api/v1', // Replace with your API base URL
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