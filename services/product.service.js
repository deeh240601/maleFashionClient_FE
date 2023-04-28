import axiosClient from './base';

const ProductService = {

    getAll: () => {
        return axiosClient.get('/product/get-all');
    },
    getProdutsPagination: (page) => {
        return axiosClient.get(`/product/page/${page}`);
    },
    getFeature: () => {
        return axiosClient.get('/product/get-feature');
    },
    getRelatedProducts: (id) => {
        return axiosClient.get(`/product/get-related/${id}`);
    },
    getById: (id) => {
        return axiosClient.get(`/product/get/${id}`);
    },
    getProductByFilter: (filterModel) => {
        return axiosClient.post(`/product/get-filter`, filterModel);
    },

};
export default ProductService;
