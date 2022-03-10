import React, { useRef, useState } from 'react'

import Input from '../UI/Input'

import './MealItemForm.css'

const MealItemForm = (props) => {

  const [isValid, setIsValid] = useState(true)
  const inputAmountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const amount = inputAmountRef.current.value;
    
    if (amount.trim().length === 0 || amount === 0 || amount > 5)
    {
      setIsValid(false);
    }
    else
    {
      setIsValid(true);
    }
    props.addToCart(amount);
  }


  return (
    <form className='form' onSubmit={submitHandler}>
        <Input 
        ref={inputAmountRef}
        id={props.id}
        description={'Amount'}
        input={{
            type: 'number',
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 0,
        }}
        />
        <button>+ Add</button>
        {!isValid && <p>Invalid Amount</p>}
    </form>
  )
}

export default MealItemForm