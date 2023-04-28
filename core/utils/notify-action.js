
import { ToastContainer, toast } from 'react-toastify';
const notifyErrorSystem = () => {
    toast.error('Có lỗi xảy ra, vui lòng liên hệ kỹ thuật viên để sửa chữa. Xin cảm ơn.');
};
const notifyErrorMessage = (message) => {
    toast.error(message, {autoClose: 2000});
};
const notifySuccessMessage = (message) => {
    toast.success(message,{autoClose: 2000} );
};

const notifyWarningMessage = (message) => {
    toast.warning(message,{autoClose: 2000} );
}



export { notifyErrorSystem, notifyErrorMessage, notifySuccessMessage, notifyWarningMessage };
