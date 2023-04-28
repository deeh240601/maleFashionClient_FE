import axiosClient from './base';

const CategoryService = {
    getAll: () => {
        return axiosClient.get('/category/get-all');
    },
    getById: (id) => {
        return axiosClient.get('/category/get/${id}');
    },

};
export default CategoryService;
