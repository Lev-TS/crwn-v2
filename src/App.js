import React from 'react';
import './App.css';

// Router components
import { Switch, Route, Redirect } from 'react-router-dom';

// Components persisting across all pages
import Header from './components/header/header.component';

// Page components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Authentication
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
	// handling authentication and user data for the app
	unsubscribeFromAuth = null;
	componentDidMount() {
		// notice how we destructure props of this block scope
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if user is authenticated and we recieve userAuth object get latest
			// snapshot object on that user and save data that comes with that
			// object into state. Else, currentUser is userAuth object, i.e null.
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// listen for document changes, e.g. if user data has been updated
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						// spreading out the snapshot key/value pairs
						...snapShot.data(),
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route
						exact
						path="/signin"
						render={() =>
							this.props.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUp />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
