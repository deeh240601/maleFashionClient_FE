import axiosClient from './base';

const WishlistService = {

    getAll: () => {
        return axiosClient.get('/wishlist/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/wishlist/get/${id}`);
    },
    create: (wishlist) => {
        return axiosClient.post('/wishlist/create', wishlist);
    },
    delete: (wishlistId) => {
        return axiosClient.get(`/wishlist/delete/${wishlistId}`);
    },


};
export default WishlistService;
