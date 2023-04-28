import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/layout';
import WishlistItems from '../components/shared/wishlist-items';
import WishlistService from '../services/wishlist.service';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await WishlistService.getAll();
        setProducts(data.result);
    };
    const deleteWishlist = useCallback(async (productId) => {
        const wishList = products.find(e => e.product._id == productId);
        const data = await WishlistService.delete(wishList._id);
        getProducts();
    });


    return (
        <Layout>
            <section className='breadcrumb-option'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='breadcrumb__text'>
                                <h4 className='wistlist__title'>Wish list </h4>
                                <div className='breadcrumb__links'>
                                    <a href='./index.html'>Home</a>
                                    <a href='./shop.html'>Shop</a>
                                    <span>Wish List</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='wishlist spad'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-auto '>
                            <div className='shopping__wishlist__table'>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((item) => (

                                        <WishlistItems deleteWishlist={deleteWishlist} product={item.product}
                                                       key={item.product._id} />
                                    ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 col-sm-12'>
                                    <div className='continue__btn'>
                                        <a href='/shop'>Continue Shopping</a>
                                    </div>
                                </div>
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
