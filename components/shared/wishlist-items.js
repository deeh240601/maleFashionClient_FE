import React, { memo, useEffect } from 'react';

const WishlistItems = ({ product, deleteWishlist }) => {
    const { _id, image, name, exportPrice, salePrice } = product;

    useEffect(() => {

    }, []);

    return (
        <tr>
            <td className='product__wishlist__item'>
                <div className='product__wishlist__item__pic'>
                    <a href='#'>
                        <div className='product__wishlist__item__pics'
                             style={{ backgroundImage: `url(${image})` }}></div>
                    </a>
                </div>
                <div className='product__wishlist__item__text'>
                    <a href='#'>{name}</a>
                </div>
            </td>
            <td className='wishlist__price'>${salePrice > 0 ? salePrice : exportPrice}</td>
            <td>
                <div>
                    <div className='add__btn'>
                        <a href='#'><i className='fa fa-cart-plus' /> Add to cart</a>
                    </div>
                </div>
            </td>
            <td className='wishlist__close' onClick={() => deleteWishlist(_id)}><i className='fa fa-close' /></td>
        </tr>
    );
};

export default memo(WishlistItems);
