import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { SignUpContainer, SignUpTitle } from "./sign-up.styles";

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		// exit this function if passwords don't match
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		try {
			// .createUserWithEmailAndPassword() is a method that comes with auth.
			// We use this method to create a new user. Notice how we destructure the user.
			// This is because the method authorises an user and returns an object. That
			// userAuth object we need for createUserProfileDocument function is saved on the
			// "user" property of the object returened.
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			// save new user to the database
			await createUserProfileDocument(user, { displayName });

			// reset the form after the user is saved
			this.setState({
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<SignUpContainer className="sign-up">
				<SignUpTitle className="title">I do not have an account</SignUpTitle>
				<span>Sign up with your email and password</span>
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						onChange={this.handleChange}
						label="Display Name"
						required
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						onChange={this.handleChange}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
						label="Confirm Password"
						required
					/>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</SignUpContainer>
		);
	}
}

export default SignUp;
