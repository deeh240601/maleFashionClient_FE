import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CartItems from '../components/shared/cart-items';
import CartService from '../services/cart_service';
import { useDispatch } from 'react-redux';
import { setNumberOfCart, setTotalPriceOfCart } from '../store/feature/UserSlice';
import VoucherService from '../services/voucher.service';
import { createNotification, notifyErrorMessage, notifySuccessMessage } from '../core/utils/notify-action';

export default function Cart() {
    const [itemsCart, setItemsCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [code, setCode] = useState('');
    const [voucher, setVoucher] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        getItemsCart();
    }, []);

    const getItemsCart = async () => {
        const data = await CartService.getAll();
        if (data.result) {
            const dataCreated = data.result || [];
            setItemsCart(dataCreated);
            let totalCreated = 0;
            dataCreated.forEach(cart => {
                const { productDetail } = cart;
                const total = (productDetail.salePrice > 0 ? productDetail.salePrice : productDetail.exportPrice) * cart.quantity;
                totalCreated += total;
            });
            setTotal(totalCreated);
            dispatch(setNumberOfCart(dataCreated.length));
            dispatch(setTotalPriceOfCart(totalCreated));
        }
    };

    const handleApproveVoucher = async () => {
        const data = await VoucherService.getAll();
        const vouchers = data.result || [];
        vouchers.forEach((voucherCreated) => {
            if(code === voucherCreated.code ){
                setVoucher(voucherCreated);
            }
        });

    }
    const handleCheckout = (e) => {
        if (itemsCart.length === 0){
            e.preventDefault()
            notifyErrorMessage('Phải có tối thiểu một sản phẩm trong giỏ')
        }
    }




    return (
        <Layout>
            <section className='breadcrumb-option'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='breadcrumb__text'>
                                <h4>Shopping Cart</h4>
                                <div className='breadcrumb__links'>
                                    <a href='./index.html'>Home</a>
                                    <a href='./shop.html'>Shop</a>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='shopping-cart spad'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='shopping__cart__table'>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {itemsCart.map((item) => (
                                        <CartItems key={item._id} itemCart={item} saveComplete={getItemsCart} getItemsCart={getItemsCart} />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <div className='continue__btn'>
                                        <a href='/shop'>Continue Shopping</a>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <div className='continue__btn update__btn'>
                                        <button className='primary-btn' onClick={getItemsCart}><i
                                            className='fa fa-spinner' /> Update cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>

                            <div className='cart__total'>
                                <h6>Cart total</h6>
                                <ul>
                                    <li>Total <span>$ {total}</span></li>
                                </ul>
                                <a href='/check-out' onClick={(e) => handleCheckout(e)} className='primary-btn'>Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts


    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {},
    };
}
