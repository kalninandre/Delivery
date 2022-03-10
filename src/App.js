import React, { useState } from 'react';

import CartProvider from './Store/CartProvider';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';

function App () {

  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(!showCart);
  };

  return (
    <CartProvider>
      {showCart && <Cart showCartHandler={showCartHandler}/>} 
      <Header showCartHandler={showCartHandler}/>
      <Meals />
    </CartProvider>
  );
}

export default App;
