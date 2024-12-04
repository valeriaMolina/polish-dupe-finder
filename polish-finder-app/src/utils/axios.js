import config from '@/config';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const SERVER = config.SERVER;

// create a single instance of axios
const axiosInstance = axios.create({
    baseURL: SERVER,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    /**
     * Interceptor handles errors received from the server
     * @param {*} error
     * @returns
     */
    async (error) => {
        console.log(`Interceptor at work: ${error.message}`);
        const originalRequest = error.config;
        if (!originalRequest._retry) {
            // if the request is not a retry and the error is due to expired token, refresh the token and retry the request
            if (
                error.response.data.name === 'TokenExpiredError' ||
                error.response.data.name === 'JsonWebTokenError' ||
                error.response.data.name === 'Forbidden'
            ) {
                originalRequest._retry = true;
                console.log(`Retrying refreshing token`);
                try {
                    await axiosInstance.post(`${SERVER}/refresh`);
                    // tokens are stored in http cookies

                    // retry the original request
                    return axiosInstance(originalRequest);
                } catch (error) {
                    return Promise.reject(new Error('InvalidToken'));
                }
            }
            if (error.response.data.name === 'MissingTokenError') {
                return Promise.reject(new Error('MissingTokenError'));
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
