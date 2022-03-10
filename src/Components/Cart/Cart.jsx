import React, { useContext } from 'react'

import CartItem from './CartItem';
import CartContext from '../../Store/CartContext'
import Modal from '../UI/Modal'

import './Cart.css'

const Cart = ({ showCartHandler }) => {

    const cartContext = useContext(CartContext)


    const CartItemAdd = (item) => {
        cartContext.addItem({...item, amount:1});
    };

    const CartItemRemove = (id) => {
        cartContext.removeItem(id)
    };

  return (
    <Modal showCartHandler={showCartHandler}>
        <ul className='cart-items'>
        {cartContext.items.map(item => (
            <CartItem 
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.amount}
            CartItemAdd={CartItemAdd.bind(null, item)}
            CartItemRemove={CartItemRemove.bind(null, item.id)}
            />
        ))}
        </ul>
        <div className='total'>
            <span id='total'>Total Amount</span>
            <span>$ {cartContext.totalAmount.toFixed(2)}</span>
        </div>
        <div className='actions'>
            <button className='button-alt' onClick={showCartHandler}>Close</button>
            <button>Order</button>
        </div>
    </Modal>
  )
}

export default Cart