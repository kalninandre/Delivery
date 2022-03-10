import React, { useState, useContext, useEffect } from 'react';

import CartIcon from './CartIcon.jsx';
import CartContext from '../../Store/CartContext.jsx';

import './HeaderButton.css';

 export default function HeaderButton ({ showCartHandler}) {

    const [bump, setBump] = useState(false);

    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.reduce((sum, current) => {
        return sum + current.amount;
    }, 0)

    useEffect(() => {
        if (cartContext.items.length === 0) 
        {
            return
        }
        setBump(true);

        const timer = setTimeout(() => {
            setBump(false)
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [cartContext.items]);
  

   return (
    <button className={`container ${bump ? 'bump' : ''}`} onClick={showCartHandler}>
        <span className='icon'>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className='badge'>{numberOfCartItems}</span>
    </button>
   )
 }
 