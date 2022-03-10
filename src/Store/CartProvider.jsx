import React, { useReducer } from 'react'

import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'Add')
    {
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if (existingCartItem)
        { 
            updatedItem = {
                ...existingCartItem,
                amount: (existingCartItem.amount + action.item.amount)
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }
        }

        else 
        {
            updatedItems = state.items.concat(action.item);

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }
        }
    }
    
    if (action.type === 'Remove')
    {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
    
        if (existingCartItem.amount === 1)
        {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
            
        else
        {
            let updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
}
      
const CartProvider = ({ children }) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCart({type: 'Add', item:item})
    };

    const RemoveItemFromCart = (id) => {
        dispatchCart({type:'Remove', id:id})
    };
   
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: RemoveItemFromCart
    }    

  return (
    <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
  )
};

export default CartProvider;