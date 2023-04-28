import axiosClient from './base';

const SizeService = {
    getAll: () => {
        return axiosClient.get('/size/get-all');
    },
    getById: (id) => {
        return axiosClient.get('/size/get/${id}');
    },

};
export default SizeService;
