import axiosClient from './base';

const SupplierService = {

    getAll: () => {
        return axiosClient.get('/supplier/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/supplier/get/${id}`);
    },

};
export default SupplierService;
