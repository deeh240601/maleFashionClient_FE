import axiosClient from './base';

const CartService = {

    getAll: () => {
        return axiosClient.get('/cart/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/cart/get/${id}`);
    },
    create: (cart) => {
        return axiosClient.post('/cart/create', cart);
    },
    update: (cart) => {
        return axiosClient.patch('/cart/update', cart);
    },
    delete: (cartId) => {
        return axiosClient.get(`/cart/delete/${cartId}`);
    },


};
export default CartService;
