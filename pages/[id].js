import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductService from '../services/product.service';
import Product from '../components/shared/product';
import WishlistService from '../services/wishlist.service';
import { useSelector } from 'react-redux';
import CartService from '../services/cart_service';
import { notifyErrorMessage } from '../core/utils/notify-action';

export default function ProductDetail() {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizeSelected, setSizeSelected] = useState('');
    const [colorSelected, setColorSelected] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    const router = useRouter();
    const { id } = router.query;
    const user = useSelector((state) => state.user);


    const { _id, image, name, code, description, supplier, star, exportPrice, salePrice, listDetails } = product;

    useEffect(() => {
        getRelatedProducts(id);
        getProductById(id);

    }, []);

    useEffect(() => {
        standardDataColors();
        standardDataSizes();
        setMainImage(image);
    }, [product]);


    const standardDataColors = () => {
        const colorsCreated = [];
        if (listDetails) {
            listDetails.forEach(detail => {
                if (colorsCreated.findIndex(item => item._id == detail.color._id) == -1) {
                    colorsCreated.push(detail.color);
                }
                ;
            });
            setColors(colorsCreated);
        }
    };

    const standardDataSizes = () => {
        const sizesCreated = [];
        if (listDetails) {
            listDetails.forEach(detail => {
                if (sizesCreated.findIndex(item => item._id == detail.size._id) == -1) {
                    sizesCreated.push(detail.size);
                }
                ;
            });
            setSizes(sizesCreated);
        }
    };

    const getProductById = async () => {
        const data = await ProductService.getById(id);
        const product = data.result;
        setProduct(product);
    };

    const getRelatedProducts = async (id) => {
        const data = await ProductService.getRelatedProducts(id);
        setRelatedProducts(data.result);
    };

    const handleClickSize = (id) => {
        setSizeSelected(id);
    };

    const handleClickColor = (id) => {
        setColorSelected(id);
    };

    const handleAddToCart = async () => {
        if (validateProductDetail()) {
            const productDetailCreated = listDetails.find(detail => (detail.size._id == sizeSelected && detail.color._id == colorSelected));
            const data = {
                productDetail: productDetailCreated._id,
                customer: user.refId,
                quantity,
            };
            await CartService.create(data);
            router.push('/cart')

        }

    };

    const handleAddWishlist = async () => {
        const data = await WishlistService.create({ product: _id, customer: user.refId });
        return data;
    };

    const validateProductDetail = () => {
        if (sizeSelected === '' || colorSelected === '') {
            notifyErrorMessage('Vui lòng chọn size và màu sắc')
            return false;
        }

        return true;
    };

    return (
        <>
            <Layout>
                <section className='breadcrumb-option'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadcrumb__text'>
                                    <h4>Shop</h4>
                                    <div className='product__details__breadcrumb'>
                                        <a href='/'>Home</a>
                                        <a href='/shop'>Shop</a>
                                        <span>Product Details</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='shop spad'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12 col-xs-12 col-sm-12'>
                                <div className='row'>
                                    <div className='col-xs-12 col-sm-6 col-lg-6 col-md-6'>
                                        <div className='product-img-main'>
                                            <img src={mainImage ? mainImage : ''} alt='' />
                                        </div>
                                        <div className='d-flex mt-2 product-img-container'>
                                            {listDetails ? listDetails.map((detail) => (
                                                <div key={detail._id} className=' product-img-child'>
                                                    <img src={detail.image} alt=''
                                                         onClick={() => setMainImage(detail.image)} />
                                                </div>
                                            )) : ''}

                                        </div>

                                    </div>
                                    <div className='col-xs-12 col-sm-6 col-lg-6 col-md-6'>
                                        <div>
                                            <h1 className=''>{name}</h1>
                                            <div className='d-flex mb-3'>
                                                <div className='item-sku'>
                                                    SKU: <span className='variant-sku' itemProp='sku'
                                                               content='N102-S-W'>{listDetails ? listDetails.map((detail) =>
                                                    (detail.color._id == colorSelected && detail.size._id == sizeSelected ? detail.code : ''),
                                                ) : ''}</span>
                                                </div>
                                                &nbsp; | &nbsp;
                                                <div className='item-sku'>
                                                    NCC:
                                                    <span className='vendor'>
                                                    {supplier ? supplier.sortName : ''}
                                                </span>
                                                </div>
                                                &nbsp; | &nbsp;
                                                <div className='rating'>
                                                    <i className={1 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                                                    <i className={2 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                                                    <i className={3 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                                                    <i className={4 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                                                    <i className={5 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                                                    <span> - 5 Reviews</span>
                                                </div>
                                            </div>
                                            <div className='product__details__text'>
                                                <div className='d-flex justify-content-between'>
                                                    <h3 className='text-left'>${salePrice == 0 ? exportPrice : salePrice}
                                                        <span>${salePrice == 0 ? '' : exportPrice}</span></h3>
                                                    <div className=' text-left'>
                                                        <a className=' size-heart-icon' onClick={handleAddWishlist}><i
                                                            className='fa fa-heart'></i> </a>
                                                    </div>
                                                </div>
                                                <div className='product__details__option  text-left'>
                                                    <div className='product__details__option__size mb-3'>
                                                        <span>Size:</span>
                                                        {sizes ? sizes.map((detail) => (
                                                            <label key={detail._id} htmlFor={detail.name}
                                                                   className={sizeSelected == detail._id ? 'active' : ''}
                                                                   onClick={() => handleClickSize(detail._id)}>{detail.name}
                                                                <input type='radio' name='size' id={detail.name}
                                                                       defaultValue={detail._id} />
                                                            </label>
                                                        )) : ''}

                                                    </div>
                                                    <div className='product__details__option__color'>
                                                        <span>Color:</span>
                                                        {colors ? colors.map((detail) => (
                                                            <label key={detail._id} style={{ backgroundColor: detail.code }}
                                                                   htmlFor={detail.name}
                                                                   onClick={() => handleClickColor(detail._id)}>
                                                                <input type='radio' name='color' id={detail.name}
                                                                       defaultValue={detail._id} />
                                                            </label>
                                                        )) : ''}

                                                    </div>

                                                </div>
                                                <p className='text-left'>{description}</p>
                                                <div className='product__details__cart__option text-left'>
                                                    <button onClick={handleAddToCart} className='primary-btn mr-3'>add to
                                                        cart
                                                    </button>
                                                    <div className='quantity'>
                                                        <div className='pro-qty'>
                                                            <input type='number'
                                                                   onChange={(e) => setQuantity(e.target.value)}
                                                                   value={quantity} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='product__details__last__option'>
                                                    <h5><span>Guaranteed Safe Checkout</span></h5>
                                                    <img src='img/shop-details/details-payment.png' alt='' />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='product__details__tab'>
                                            <ul className='nav nav-tabs' role='tablist'>
                                                <li className='nav-item'>
                                                    <a className='nav-link active' data-toggle='tab' href='#tabs-5'
                                                       role='tab'>Description</a>
                                                </li>
                                                <li className='nav-item'>
                                                    <a className='nav-link' data-toggle='tab' href='#tabs-6' role='tab'>Customer
                                                        Previews(5)</a>
                                                </li>
                                            </ul>
                                            <div className='tab-content'>
                                                <div className='tab-pane active' id='tabs-5' role='tabpanel'>
                                                    <div className='product__details__tab__content'>
                                                        <p className='note'>{description}</p>
                                                    </div>
                                                </div>
                                                <div className='tab-pane' id='tabs-6' role='tabpanel'>
                                                    <div className='product__details__tab__content'>
                                                        <div className='row'>
                                                            <div className='col-md-1'>
                                                                <img src='img/about/team-1.jpg' alt='' />
                                                            </div>
                                                            <div className='col-md-11'>
                                                                <div className='customer-name'>Sam</div>
                                                                <div className='rating'>
                                                                    <i className='fa fa-star'></i>
                                                                    <i className='fa fa-star'></i>
                                                                    <i className='fa fa-star'></i>
                                                                    <i className='fa fa-star'></i>
                                                                    <i className='fa fa-star-o'></i>
                                                                </div>
                                                                <div className='d-flex mb-3'>
                                                                    <div className='rating-time'>
                                                                        <div className='time'>2022-10-02 20:00</div>
                                                                    </div>
                                                                    &nbsp; | &nbsp;
                                                                    <div className='rating-time'>
                                                                        Phân loại:
                                                                        &nbsp;
                                                                        <span className='product-name'>
                                                                            MULTIPLE PERSONALITY T-SHIRT
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='comment'>Hello hello 1 2 3 4</div>
                                                            </div>
                                                            <hr width='100%' align='center' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Related Section Begin --> */}
                                <section className='related spad'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-lg-12'>
                                                <h3 className='related-title'>Related Product</h3>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            {relatedProducts.map(item => {
                                                return <Product typeCol={true} product={item} key={item._id} />;
                                            })}
                                        </div>
                                    </div>
                                </section>
                                {/* <!-- Related Section End --> */}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getServerSideProps(params) {
    // console.log(params);
    // Call an external API endpoint to get posts


    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {},
    };
}
