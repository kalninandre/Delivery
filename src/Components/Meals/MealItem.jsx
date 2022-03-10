import React, { useContext } from 'react'

import MealItemForm from './MealItemForm'

import './MealItem.css'
import CartContext from '../../Store/CartContext'

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const price = `$ ${props.price.toFixed(2)}`

  const addToCart = (amount) => {
    cartContext.addItem({
      name: props.name,
      id: props.id,
      amount:parseInt(amount),
      price: props.price,
    })
  };

  return (
    <div className='meal'>
        <div>
            <h3>{props.name}</h3>
            <div className='description'>{props.description}</div>
        </div>
        <div className='price'>{price}</div>
        <div><MealItemForm addToCart={addToCart} id={props.id}/></div>
    </div>
    
  )
}

export default MealItem