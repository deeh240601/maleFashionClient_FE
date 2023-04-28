import axiosClient from './base';

const ColorService = {

    getAll: () => {
        return axiosClient.get('/color/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/color/get/${id}`);
    },

};
export default ColorService;
