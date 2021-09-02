import React from 'react';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RequestUser from '../../utilities/RequestUser';
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import Error from '../../utilities/error';

//crypt only password to front-end hide browser request!!!
//import Cryptr from 'cryptr';

const phonePattern = /^(\+)?([0-9]){10,32}$/m;
const agePattern = /^[0-9]{2}/g;
const emailPattern = /^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$/m;
const cityPattern = /^[A-Z]{1}[a-z]+([\s]{1}[A-Z]{1}[a-z]+)?/;
const firstNamePattern = /^[A-Z]{1}[a-z]+/;
const lastNamePattern = /^[A-Z]{1}[a-z]+/;
const passwordPattern = /^[A-Za-z\d]{8,}$/m;

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			age: '',
			phone: '',
			email: '',
			city: '',
			password: '',
			repeatPassword: '',
			checkbox: false,
			redirect: null
		};

		this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
		this.handleBlurFirstName = this.handleBlurFirstName.bind(this);
		this.handleFocusFirstName = this.handleFocusFirstName.bind(this);

		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleBlurLastName = this.handleBlurLastName.bind(this);
		this.handleFocusLastName = this.handleFocusLastName.bind(this);

		this.handleChangeAge = this.handleChangeAge.bind(this);
		this.handleBlurAge = this.handleBlurAge.bind(this);
		this.handleFocusAge = this.handleFocusAge.bind(this);

		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleBlurPhone = this.handleBlurPhone.bind(this);
		this.handleFocusPhone = this.handleFocusPhone.bind(this);

		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleBlurEmail = this.handleBlurEmail.bind(this);
		this.handleFocusEmail = this.handleFocusEmail.bind(this);

		this.handleChangeCity = this.handleChangeCity.bind(this);
		this.handleBlurCity = this.handleBlurCity.bind(this);
		this.handleFocusCity = this.handleFocusCity.bind(this);

		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleBlurPassword = this.handleBlurPassword.bind(this);
		this.handleFocusPassword = this.handleFocusPassword.bind(this);

		this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
		this.handleBlurRepeatPassword = this.handleBlurRepeatPassword.bind(this);
		this.handleFocusRepeatPassword = this.handleFocusRepeatPassword.bind(this);
		
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleChangeFirstName(e) {
		await this.setState({ firstName: e.target.value });
		this.virifyInputFields(firstNamePattern, this.state.firstName, 'describe-firstName');
	}

	handleBlurFirstName(e) {
		this.blurLabelEffect(this.state.firstName, 'label-firstName');
	}

	handleFocusFirstName(e) {
		this.focusLabelEffect('label-firstName');
	}

	async handleChangeLastName(e) {
		await this.setState({ lastName: e.target.value });
		this.virifyInputFields(lastNamePattern, this.state.lastName, 'describe-lastName');
	}

	handleBlurLastName(e) {
		this.blurLabelEffect(this.state.lastName, 'label-lastName');
	}

	handleFocusLastName(e) {
		this.focusLabelEffect('label-lastName');
	}

	async handleChangeAge(e) {
		await this.setState({ age: e.target.value });
		this.virifyInputFields(agePattern, this.state.age, 'describe-age');
	}

	handleBlurAge(e) {
		this.blurLabelEffect(this.state.age, 'label-age');
	}

	handleFocusAge(e) {
		this.focusLabelEffect('label-age');
	}

	async handleChangePhone(e) {
		await this.setState({ phone: e.target.value });
		this.virifyInputFields(phonePattern, this.state.phone, 'describe-phone');
	}

	handleBlurPhone(e) {
		this.blurLabelEffect(this.state.phone, 'label-phone');
	}

	handleFocusPhone(e) {
		this.focusLabelEffect('label-phone');
	}

	async handleChangeEmail(e) {
		await this.setState({ email: e.target.value });
		this.virifyInputFields(emailPattern, this.state.email, 'describe-email');
	}

	handleBlurEmail(e) {
		this.blurLabelEffect(this.state.email, 'label-email');
	}

	handleFocusEmail(e) {
		this.focusLabelEffect('label-email');
	}

	async handleChangeCity(e) {
		await this.setState({ city: e.target.value });
		this.virifyInputFields(cityPattern, this.state.city, 'describe-city');
	}

	handleBlurCity(e) {
		this.blurLabelEffect(this.state.city, 'label-city');
	}

	handleFocusCity(e) {
		this.focusLabelEffect('label-city');
	}

	async handleChangePassword(e) {
		await this.setState({ password: e.target.value });
		this.virifyInputFields(passwordPattern, this.state.password, 'describe-password');
	}

	handleBlurPassword(e) {
		this.blurLabelEffect(this.state.password, 'label-password');
	}

	handleFocusPassword(e) {
		this.focusLabelEffect('label-password');
	}

	async handleChangeRePassword(e) {
		await this.setState({ repeatPassword: e.target.value });
		let description = document.querySelector(`.describe-repeatPassword`);
		if(this.state.repeatPassword === '')
			description.style.color = 'dimgray';
		else if(this.state.password === this.state.repeatPassword) 
			description.style.color = '#5F9EA0';
		else
			description.style.color = 'rgb(220,53,69)';
	
	}

	handleBlurRepeatPassword(e) {
		this.blurLabelEffect(this.state.repeatPassword, 'label-repeatPassword');
	}

	handleFocusRepeatPassword(e) {
		this.focusLabelEffect('label-repeatPassword');
	}

	handleChangeCheckbox(e) {
		this.setState({ checkbox: e.target.checked });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { firstName, lastName, age, phone, email, city, password, repeatPassword, checkbox } = this.state;

		const newUser = {
			firstName,
			lastName,
			age,
			phone,
			email,
			city,
			password,
			repeatPassword,
			checkbox
		};

		RequestUser.signUp(newUser)
			.then(data => {
				cookie.save('e-jwt[@$64^id]!', data.data.user._id, {
					maxAge: (24 * 60 * 60 * 1000),
					path: '/',
					secure: true,
					httpOnly: false
				});
				myToastr.success(data.data.message);
				this.setState({ redirect: '/' });
			}).catch(err => Error(err));
	}

	blurLabelEffect(st, classSelector) {
		let label = document.querySelector(`.${classSelector}`);
		if(st === '') {
			label.style["transform"] = "scale(1) translate(0px, 0px)";
			label.style["color"] = "#696969";
		} else {
			label.style["transform"] = "scale(0.9) translate(-20px, -25px)";
			label.style["color"] = "#5F9EA0";
		}
	}

	focusLabelEffect(classSelector) {
		let labelFirstName = document.querySelector(`.${classSelector}`);
		labelFirstName.style["transform"] = "scale(0.9) translate(-20px, -25px)";
		labelFirstName.style["color"] = "#5F9EA0";
	}

	virifyInputFields(regPattern, stateName, describeClassName) {
		let description = document.querySelector(`.${describeClassName}`);
		if(stateName === '')
			description.style.color = 'dimgray';
	    else if(regPattern.test(stateName))
			description.style.color = '#5F9EA0';
	    else 
			description.style.color = 'rgb(220,53,69)';
	}

	changeTitleColor(e) {
		document.querySelector('.sign-up-title').style["color"] = '#5F9EA0';
		document.querySelector('.sign-up-title-bottom-border').style["width"] = '100%';
	}

	returnDefaultTitleColor(e) {
		document.querySelector('.sign-up-title').style["color"] = 'dimgray';
		document.querySelector('.sign-up-title-bottom-border').style["width"] = '0px';
	}

	

	render() {

		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		return (
			<div className="primary-container">
				
				<div className="sign-up-container">
					<div className="sign-up-title-container">
						<h2 className="sign-up-title">Sign Up</h2>
						<span className="sign-up-title-bottom-border"></span>
					</div>
					
					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="input-container">
								<input type="text" id="firstName" className="sign-up-input" name="firstName" 
									onChange={this.handleChangeFirstName}
									onBlur={this.handleBlurFirstName}
									onFocus={this.handleFocusFirstName}
								/>
								<label htmlFor="firstName" className="sign-up-label label-firstName">First Name</label>
								<FontAwesomeIcon icon="user" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-firstName">It start with upper letter</small></div>
							</div>
							<div className="input-container">
								<input type="text" id="lastName" className="sign-up-input" name="lastName" 
									onChange={this.handleChangeLastName}
									onBlur={this.handleBlurLastName}
									onFocus={this.handleFocusLastName}
								/>
								<label htmlFor="lastName" className="sign-up-label label-lastName">Last Name</label>
								<FontAwesomeIcon icon="user-tie" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-lastName">It start with upper letter</small></div>
							</div>
						</div>

						<div className="row">
							<div className="input-container">
								<input type="text" id="age" className="sign-up-input" name="age" 
									onChange={this.handleChangeAge}
									onBlur={this.handleBlurAge}
									onFocus={this.handleFocusAge}
								/>
								<label htmlFor="age" className="sign-up-label label-age">Age</label>
								<FontAwesomeIcon icon="heart" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-age">Positive a number</small></div>
							</div>
							<div className="input-container">
								<input type="text" id="phone-number" className="sign-up-input" name="phone-number" 
									onChange={this.handleChangePhone}
									onBlur={this.handleBlurPhone}
									onFocus={this.handleFocusPhone}
								/>
								<label htmlFor="phone-number" className="sign-up-label label-phone">Phone Number</label>
								<FontAwesomeIcon icon="mobile-alt" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-phone">It may started + or not</small></div>
							</div>
						</div>

						<div className="row">
							<div className="input-container">
								<input type="text" id="email" className="sign-up-input" name="email" 
									onChange={this.handleChangeEmail}
									onBlur={this.handleBlurEmail}
									onFocus={this.handleFocusEmail}
								/>
								<label htmlFor="email" className="sign-up-label label-email">Email</label>
								<FontAwesomeIcon icon="envelope" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-email">It is valid email</small></div>
							</div>
							<div className="input-container">
								<input type="text" id="city" className="sign-up-input" name="city" 
									onChange={this.handleChangeCity}
									onBlur={this.handleBlurCity}
									onFocus={this.handleFocusCity}
									/>
								<label htmlFor="city" className="sign-up-label label-city">City</label>
								<FontAwesomeIcon icon="map-marker-alt" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-city">It start with upper letter</small></div>
							</div>
						</div>
					
						<div className="row">
							<div className="input-container">
								<input type="text" id="password" className="sign-up-input" name="password" 
									onChange={this.handleChangePassword}
									onBlur={this.handleBlurPassword}
									onFocus={this.handleFocusPassword}
								/>
								<label htmlFor="password" className="sign-up-label label-password">Password</label>
								<FontAwesomeIcon icon="lock" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-password">At least 8 letters and digits</small></div>
							</div>
							<div className="input-container">
								<input type="text" id="RePassword" className="sign-up-input" name="rePassword" 
									onChange={this.handleChangeRePassword}
									onBlur={this.handleBlurRepeatPassword}
									onFocus={this.handleFocusRepeatPassword}
								/>
								<label htmlFor="RePassword" className="sign-up-label label-repeatPassword">Repeat Password</label>
								<FontAwesomeIcon icon="lock" className="sign-up-icon"/>
								<span className="sign-up-input-border-bottom-effect"></span>
								<div><small className="sign-up-description describe-repeatPassword">Passwords must be matches</small></div>
							</div>
						</div>
					
						<div className="checkbox-container">
							<input type="checkbox" id="check" className="sign-up-checkbox-input" name="check" onChange={this.handleChangeCheckbox}/>
							<label htmlFor="check" className="sign-up-checkbox-label">You agree to our terms of service</label>
						</div>
						<button type="submit" className="signup-btn" 
							onMouseOver={this.changeTitleColor}
							onMouseLeave={this.returnDefaultTitleColor}
						>Sign Up
						</button>
					</form>

				</div>
			</div>
		)
	}
}

export default SignUp;