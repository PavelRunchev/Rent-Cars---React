import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, withRouter } from "react-router-dom";
import RequestUser from '../../utilities/RequestUser';
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import Error from '../../utilities/error';

//crypt only password to front-end hide browser request!!!
import Cryptr from 'cryptr';
const cryptr = new Cryptr('Raider');

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			redirect: null
		}

		this.changeHandlerEmail = this.changeHandlerEmail.bind(this);
		this.changeBlurEmail = this.changeBlurEmail.bind(this);
		this.changeFocusEmail = this.changeFocusEmail.bind(this);
		
		this.changeHandlerPassword = this.changeHandlerPassword.bind(this);
		this.changeBlurPassword = this.changeBlurPassword.bind(this);
		this.changeFocusPassword = this.changeFocusPassword.bind(this);

		this.onSubmit = this.onSubmit.bind(this);
	}

	changeHandlerEmail(e) {
		this.setState({ email: e.target.value });
	}

	changeBlurEmail(e) {
		this.blurLabelEffect(this.state.email, 'sign-in-label-email');
	}

	changeFocusEmail(e) {
		this.focusLabelEffect('sign-in-label-email');
	}

	changeHandlerPassword(e) {
		this.setState({ password: e.target.value });
	}

	changeBlurPassword(e) {
		this.blurLabelEffect(this.state.password, 'sign-in-label-password');
	}

	changeFocusPassword(e) {
		this.focusLabelEffect('sign-in-label-password');
	}

	 onSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		if(email === '' || password === '')
			myToastr.error('Fields is required!');

		//crypted password dont show in browser sending to server API!!!
		const encryptedPassword = cryptr.encrypt(password);
		RequestUser.signIn({ email: email, password: encryptedPassword })
			.then(data => {
				cookie.save('e-jwt[@$64^id]!', data.data.user._id, {
					maxAge: 3600000,
					path: '/',
					secure: true,
					httpOnly: false
				});
				myToastr.info(data.data.message);
				this.setState({ redirect: '/' });
			}).catch(err => Error(err));
	}

	blurLabelEffect(st, classSelector) {
		let label = document.querySelector(`.${classSelector}`);
		if(st === '') {
			label.style["transform"] = "scale(1) translate(0px, 0px)";
			label.style["color"] = "#696969";
		} else {
			label.style["transform"] = "scale(0.9) translate(-20px, -30px)";
			label.style["color"] = "#5F9EA0";
		}
	}

	focusLabelEffect(classSelector) {
		let labelFirstName = document.querySelector(`.${classSelector}`);
		labelFirstName.style["transform"] = "scale(0.9) translate(-20px, -30px)";
		labelFirstName.style["color"] = "#5F9EA0";
	}

	changeTitleColor() {
		document.querySelector('.sign-in-form-tittle').style["transition"] = 'all 0.5s';
		document.querySelector('.sign-in-form-tittle').style["color"] = '#5F9EA0';
		document.querySelector('.sign-in-form-tittle').style["border-radius"] = '50%';
		document.querySelector('.sign-in-form-tittle').style["border"] = '2px solid #5F9EA0';
	}

	returnDefaultTitleColor() {
		document.querySelector('.sign-in-form-tittle').style["transition"] = 'all 0.5s';
		document.querySelector('.sign-in-form-tittle').style["color"] = 'dimgray';
		document.querySelector('.sign-in-form-tittle').style["border"] = '2px solid transparent';
	}

	render() {
		if (this.state.redirect) {
    		return <Redirect to={this.state.redirect} />
  		}
		
		return (
			<div className="primary-container">
				
				<div className="sign-in-container">
					<img className="sign-in-image" src="https://www.rhodes-rentacar.gr/images/home/slideshow/alexander.jpg" alt="gallery-img"/>
					<div className="sign-in-form-container">
						<form className="sign-in-form" onSubmit={this.onSubmit}>
							<h2 className="sign-in-form-tittle">Sign In</h2>
							<div className="sign-in-form-input-container">
								<input type="text" className="sign-in-form-input sign-in-input-email" 
									id="email" name="email"
									onChange={this.changeHandlerEmail}
									onBlur={this.changeBlurEmail}
									onFocus={this.changeFocusEmail}
								/>
								<label htmlFor="email" className="sign-in-form-label sign-in-label-email">Email</label>
								<FontAwesomeIcon icon="envelope" className="sign-in-icon-email"/>
								<span className="sign-in-input-border-bottom-effect"></span>
							</div>
							<div className="sign-in-form-input-container">
								<input type="text" className="sign-in-form-input sign-in-input-password" 
									id="password" name="password"
									onChange={this.changeHandlerPassword}
									onBlur={this.changeBlurPassword}
									onFocus={this.changeFocusPassword}
								/>
								<label htmlFor="password" className="sign-in-form-label sign-in-label-password">Password</label>
								<FontAwesomeIcon icon="lock" className="sign-in-icon-password"/>
								<span className="sign-in-input-border-bottom-effect"></span>
							</div>
							<button className="sign-in-btn" type="submit"
								onMouseOver={this.changeTitleColor}
								onMouseLeave={this.returnDefaultTitleColor}
							>Sign In
							</button>
							<div className="sign-in-account-text">Don't have an account? <NavLink className="sign-in-dont-have-an-account" to="/sign-up">Sign Up</NavLink></div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(SignIn);