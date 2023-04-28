import axiosClient from './base';
import { store } from '../store';

const UserService = {
    getById: (id) => {
        return axiosClient.get(`/user/get/${id}`);
    },
    getCurrentUser: () => {
         return axiosClient.get(`/user/get-current`);
    },

};
export default UserService;
