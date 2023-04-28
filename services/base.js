import axios from 'axios';
import querystring from 'query-string';
import { store } from '../store';
import jwt_decode from 'jwt-decode';
import AuthService from './auth.service.js';
import { setToken } from '../store/feature/UserSlice';
import { notifyErrorMessage, notifyErrorSystem, notifySuccessMessage } from '../core/utils/notify-action';

const configURL = {
    baseURL: 'https://vps-male-fashion-hdihy.run.goorm.io/api/v1',
    urlAnonymous: [
        '/color/get-all',
        '/size/get-all',
        '/product/get-all',
        '/category/get-all',
        '/supplier/get-all',
    ],
};

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: params => querystring.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
    if (!configURL.urlAnonymous.includes(config.url)) {
        const tokenLocal = store.getState().user.token;
        if (tokenLocal) {
            const decodedToken = await jwt_decode(tokenLocal);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                const response = await AuthService.refreshToken();
                store.dispatch(setToken(response.data.result));
            }
        }
        const token = 'Bearer ' + store.getState().user.token;
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
}, (err) => Promise.reject(err));

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        if (response.data.message && response.data.message.length > 0) {
            const listMessage = response.data.message;
            const status = response.data.status;
            if (status <= 250) {
                listMessage.forEach(e => {
                    notifySuccessMessage(e);
                });
            } else {
                listMessage.forEach(e => {
                    notifyErrorMessage(e);
                });
            }
        }
        return response.data;
    }
    return response;
}, error => {
    if (error.response && error.response.data && error.response.data.message) {
        const listMessage = error.response.data.message;
        if (listMessage.constructor === Array) {
            listMessage.forEach((e) => {
                notifyErrorMessage(e);
            });
        } else notifyErrorSystem();

    } else {
        notifyErrorSystem();
    }

    throw error;
});

export default axiosClient;

