import { CartActionTypes } from './cart.types';

// it is not necessary to pass payload, our feature is
// set up so that it will set the hidden property in
// the reducer to opposite of whatever it's previous state was  
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})