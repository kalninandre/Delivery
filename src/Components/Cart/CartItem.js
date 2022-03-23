import classes from './CartItem.module.css';

const CartItem = (props) => {
  const totalPrice = `$${props.price.toFixed(2) * props.amount}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{totalPrice}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.CartItemRemove}>−</button>
        <button onClick={props.CartItemAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
