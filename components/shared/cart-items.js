import React, { useCallback, useEffect, useState } from 'react';
import CartService from '../../services/cart_service';
import { debounce } from 'lodash';
import { createNotification, notifyErrorMessage, notifySuccessMessage } from '../../core/utils/notify-action';


const CartItems = ({ itemCart, getItemsCart, saveComplete }) => {
    const { _id, name, productDetail, quantity } = itemCart;
    const [quantityInput, setQuantityInput] = useState(quantity);
    const [quantityInputTmp, setQuantityInputTmp] = useState(quantity);
    const price = productDetail.salePrice > 0 ? productDetail.salePrice : productDetail.exportPrice;
    const debouncedQuantity = useCallback(debounce((nextValue) => setQuantityInput(nextValue), 500), []);
    useEffect(() => {
        updateQuantity();
    }, [quantityInput]);
    const updateQuantity = async () => {
        if (quantityInput > productDetail.stock ) {
            notifyErrorMessage('Vượt quá số lượng')
            return
        }
        const data = await CartService.update({
            _id,
            name,
            productDetail,
            quantity: quantityInput,
        });
        saveComplete()
    };
    const handleSetQuantity = (evt) => {
        if (evt.target.value > productDetail.stock ) {
            notifyErrorMessage('Vượt quá số lượng')
            return
        }
        setQuantityInputTmp(evt.target.value);
        debouncedQuantity(evt.target.value);
    };
    const handleDeleteItemCart = async () => {
        await CartService.delete(_id);
        getItemsCart();
    };

    return (
        <tr>
            <td className='product__cart__item'>
                <div className='product__cart__item__pic'>
                    <div className='product__wishlist__item__pics'
                         style={{ backgroundImage: `url(${productDetail.image})` }} />
                </div>
                <div className='product__cart__item__text'>
                    <h6>{name}</h6>
                    <h5>${price}</h5>
                </div>
            </td>
            <td className='quantity__item'>
                <div className='quantity'>
                    <div className='pro-qty-2'>
                        <input type='number' value={quantityInputTmp} onChange={handleSetQuantity}
                               defaultValue={quantityInputTmp} />
                    </div>
                </div>
            </td>
            <td className='cart__price'>${price * quantity}</td>
            <td className='cart__close' onClick={handleDeleteItemCart}><i className='fa fa-close' /></td>
        </tr>
    );
};

export default CartItems;
