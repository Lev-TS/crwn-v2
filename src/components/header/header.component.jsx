import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className="logo" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/shop">CONTACT</OptionLink>
			{currentUser ? (
				<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
			) : (
				<OptionLink to="/signin">SIGN IN</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{hidden ? null : <CartDropdown />}
	</HeaderContainer>
);

// we are passing the rootReducer object (store) in this function,
// and we are accessing user property on that store which was
// created with userReducer. Notice that currentUser key and the prop passed
// in the Header component on line 16. The property name on the object
// returned from the mapStateToProps function should always be the same
// as the prop name we are destructuring in the component.
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
// 	currentUser,
// 	hidden,
// });
// We can user selectors to avoid unecessary rerendering. Normally we would write:
// const mapStateToProps = (state) => ({
// 	currentUser: selectCurrentUser(state),
// 	hidden: selectCartHidden(state)
// });
// But to avoid repetition, when we have multiple selectors we could use
// createStructuredSelector function from 'reselect' linrary (don't forget to import)
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

// connect is the higher order function that tweaks the components we
// pass inside, it takes two arguments one being the mapStateToProps
// function
export default connect(mapStateToProps)(Header);
