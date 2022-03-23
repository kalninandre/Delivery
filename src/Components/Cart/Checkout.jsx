import { useState, useRef } from 'react'; 

import classes from './Checkout.module.css';

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name:true,
        street: true,
        postalCode: true,
        city: true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (value) => {
        return value.trim() === '';
    };

    const isFiveChars = (value) => {
        return value.trim().length === 5;
    };

  const confirmationHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormValidity({
        name: nameIsValid,
        street: streetIsValid,
        city: cityIsValid,
        postalCode: postalCodeIsValid,
    })

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
        return;
    }

    props.submitOrderHandler({
        name:enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmationHandler}>
        
      <div className={`${classes.control} ${!formValidity.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formValidity.name && (
            <p>Invalid Name</p>
        )}
      </div>

      <div className={`${classes.control} ${!formValidity.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formValidity.street && (
            <p>Invalid Street</p>
        )}
      </div>

      <div className={`${classes.control} ${!formValidity.postalCode ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formValidity.postalCode && (
            <p>Invalid Postal Code</p>
        )}
      </div>

      <div className={`${classes.control} ${!formValidity.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValidity.city && (
            <p>Invalid City</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.showCartHandler}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>

    </form>
  );
};

export default Checkout;