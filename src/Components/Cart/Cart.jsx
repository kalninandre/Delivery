import React, { useState, useContext } from 'react'

import CartItem from './CartItem';
import CartContext from '../../Store/CartContext'
import Modal from '../UI/Modal'
import Checkout from './Checkout';

import './Cart.css'

const Cart = ({ showCartHandler }) => {


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false)
    
    const [checkout, setCheckout] = useState(false);

    const cartContext = useContext(CartContext)


    const CartItemAdd = (item) => {
        cartContext.addItem({...item, amount: 1});
    };

    const CartItemRemove = (id) => {
        cartContext.removeItem(id)
    };

    const orderHandler = () => {
        setCheckout(true);
    }

    const submitOrderHandler = (data) => {
        setIsSubmitting(true);
        fetch('https://restaurant-app-backend-default-rtdb.firebaseio.com/orders.json', {
            method:'POST',
            body:JSON.stringify({
                User: data,
                Items: cartContext.items,
            }),
        })

        setIsSubmitting(false);
        setDidSubmit(true);

        cartContext.clearCart();
     }

     const cartContent = 
     <React.Fragment>
        <ul className='cart-items'>
        {cartContext.items.map(item => (
         <CartItem 
         key={item.id}
         id={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price}
         CartItemAdd={CartItemAdd.bind(null, item)}
         CartItemRemove={CartItemRemove.bind(null, item.id)}
         />
        ))}
        </ul>
        <div className='total'>
            <span id='total'>Total Amount</span>
            <span>$ {cartContext.totalAmount.toFixed(2)}</span>
        </div>
        {checkout && <Checkout showCartHandler={showCartHandler} submitOrderHandler={submitOrderHandler}/>}
        {!checkout && (
            <div className='actions'>
                <button className='button-alt' onClick={showCartHandler}>Close</button>
                <button onClick={orderHandler}>Order</button>
            </div>
        )}
    </React.Fragment>

    const loadingCartContent = <p>Sending order data...</p>

    const loadedCartContent = 
    <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className='actions'>
            <button className='button' onClick={showCartHandler}>Close</button>
        </div>
    </React.Fragment>

  return (
    <Modal showCartHandler={showCartHandler}>
        {!isSubmitting && !didSubmit && cartContent}
        {isSubmitting && !didSubmit && loadingCartContent}
        {!isSubmitting && didSubmit && loadedCartContent}
    </Modal>
  )
}

export default Cart