import axiosClient from './base';

const VoucherService = {

    getAll: () => {
        return axiosClient.get('/voucher/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/voucher/get/${id}`);
    },

};
export default VoucherService;
