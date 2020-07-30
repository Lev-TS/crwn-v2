import React from 'react';
import './App.css';

// Router components
import { Switch, Route } from 'react-router-dom';

// Components persisting across all pages
import Header from './components/header/header.component';

// Page components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Authentication
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	// handling authentication and user data for the app
	unsubscribeFromAuth = null;
	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if user is authenticated and we recieve userAuth object get latest
			// snapshot object on that user and save data that comes with that
			// object into state. Else, currentUser is userAuth object, i.e null.
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// listen for document changes, e.g. if user data has been updated
				userRef.onSnapshot((snapShot) => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							// spreading out the snapshot key/value pairs
							...snapShot.data(),
						},
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
			}
		});
	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignUp} />
				</Switch>
			</div>
		);
	}
}

export default App;
