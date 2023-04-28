//image, name, rating, price

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import WishlistService from '../../services/wishlist.service';

export default function Product({ product, typeCol }) {
    const { _id, image, name, star, exportPrice, salePrice } = product;
    const user = useSelector((state) => state.user);
    const router = useRouter();

    const handleAddWishlist = async () => {
        const data = await WishlistService.create({ product: _id, customer: user.refId });
        return data;
    };


    const handlePickItem = () => {
        router.push(`/${_id}`);
    };

    return (
        <div
            className={typeCol === true ? 'col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals' : 'col-lg-4 col-md-6 col-sm-6'}>
            <div className='product__item sale'>
                <div className='product__item__pic set-bg' style={{ backgroundImage: `url(${image})` }}>
                    {salePrice > 0 ? <span className='label'>Sale</span> : ''}
                    <ul className='product__hover'>
                        <li>
                            <div><img src='img/icon/heart.png' alt='' onClick={handleAddWishlist} /></div>
                        </li>
                    </ul>
                    <div onClick={handlePickItem} className='product__item__layer'/>
                </div>
                <div style={{paddingTop:'20px', position:'relative'}}>
                    <h6 className='multiLineLabel textMaxLine' style={{fontFamily:'inherit'}}>{name}</h6>
                    <div className='rating'>
                        <i className={1 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                        <i className={2 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                        <i className={3 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                        <i className={4 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                        <i className={5 <= star ? 'fa fa-star' : 'fa fa-star-o'} />
                    </div>
                    <h5>${salePrice > 0 ? salePrice : exportPrice}</h5>
                </div>
            </div>
        </div>
    );
}
