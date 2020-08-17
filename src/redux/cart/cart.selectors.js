import { createSelector } from 'reselect';

// this input selector just gets the cart property
// from the global state object
const selectCart = (state) => state.cart;

// this output selector takes two argument, the first
// argument is an array of input selectors (there could
// be more than one), the second argument is a function
// that returns the value we won't from this selector.
// since we used createSelector function. this is the
// memoized output selector.
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		)
);

export const selectCartHidden = createSelector(
	[selectCart],
	(cart) => cart.hidden
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	(cartItems) =>
	cartItems.reduce(
		(accumulatedQuantity, cartItem) =>
			accumulatedQuantity + cartItem.quantity * cartItem.price,
		0
	)
)
