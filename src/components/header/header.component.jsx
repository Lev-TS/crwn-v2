import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser }) => {
	return (
		<div className="header">
			<Link className="logo-container" to="/">
				<Logo className="logo" />
			</Link>
			<div className="options">
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Link className="option" to="/shop">
					CONTACT
				</Link>
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className="option" to="/signin">
						SIGN IN
					</Link>
				)}
			</div>
		</div>
	);
};

// we are passing the rootReducer object (store) in this function,
// and we are accessing user property on that store which was
// created with userReducer. Notice that currentUser key and the prop passed
// in the Header component on line 10. The property name on the object
// returned from the mapStateToProps function should always be the same
// as the prop name we are destructuring in the component.
const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

// connect is the higher order function that tweaks the components we
// pass inside, it takes two arguments one being the mapStateToProps
// function
export default connect(mapStateToProps)(Header);
