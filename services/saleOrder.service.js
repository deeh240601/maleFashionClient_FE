import axiosClient from './base';

const SaleOrderService = {

    getAll: () => {
        return axiosClient.get('/saleOrder/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/saleOrder/get/${id}`);
    },
    getFullById: (id) => {
        return axiosClient.get(`/saleOrder/get-full/${id}`);
    },
    create: (saleOrder) => {
        return axiosClient.post('/saleOrder/create', saleOrder);
    },
    delete: (saleOrderId) => {
        return axiosClient.get(`/saleOrder/delete/${saleOrderId}`);
    },
    updateStatus: (object) => {
        return axiosClient.post('/saleOrder/update-status', object);
    },


};
export default SaleOrderService;
