import React from 'react';

class Contacts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			description: '',
			errorEmail: false,
			errorDescription: false
		}
	}

	changeHandlerEmail = (ev) => {
		this.setState({ email: ev.target.value });
	}

	//In focus input field
	changeFocusEmail = (ev) => {
		let label = document.querySelector('.form-label');
		label.style["transform"] = "scale(0.9) translate(-20px, -25px)";
		label.style["color"] = "rgba(1,135,134,1)";
	}

	//Out focus input field
	changeBlurEmail = (ev) => {
		let label = document.querySelector('.form-label');
		if(this.state.email === '') {
			label.style["transform"] = "scale(1) translate(0px, 0px)";
			label.style["color"] = "#fff";
		} else {
			//if email not empty, label is out focus!
			label.style["transform"] = "scale(0.9) translate(-20px, -25px)";
			label.style["color"] = "rgba(1,135,134,1)";
		}

		if(this.state.email.match('^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$')) {
			this.setState({ errorEmail: false });
		} else if(this.state.email === '') {
			this.setState({ errorEmail: false });
		} else {
			this.setState({ errorEmail: true });
		}
	}

	changeHandlerDescription = (ev) => {
		this.setState({ description: ev.target.value });
	}

	changeFocusDescription = (ev) => {
		let labelDesc = document.querySelector('.form-label-textarea');
		labelDesc.style["transform"] = "scale(0.9) translate(-20px, -25px)";
		labelDesc.style["color"] = "rgba(1,135,134,1)";
	}

	changeBlurDescription = (ev) => {
		let labelDesc = document.querySelector('.form-label-textarea');
		if(this.state.description === '') {
			labelDesc.style["transform"] = "scale(1) translate(0px, 0px)";
			labelDesc.style["color"] = "#fff";
		} else {
			//if description not empty, label is out focus!
			labelDesc.style["transform"] = "scale(0.9) translate(-20px, -25px)";
			labelDesc.style["color"] = "rgba(1,135,134,1)";
		}

		if(this.state.description.length > 0 && this.state.description.length < 20)
			this.setState({ errorDescription: true });
		else
			this.setState({ errorDescription: false });
	}

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { email, description, errorEmail, errorDescription} = this.state;

		if((email !== '' && description !== '') && (!errorDescription && !errorEmail)) {	
			this.props.history.push('/');
		}
	}

	render () {
		const { email, description, errorEmail, errorDescription } = this.state;
		return (
			<div className="primary-container">
				<h2>Contact Section</h2>

				<form className="form" onSubmit={this.handleSubmit}>
					<h3 className="form-title">Subscription form</h3>
					<div className="form-input-container">
						{errorEmail ? <p className="form-error-input-email">Invalid Email!</p> : null}
						<input className="form-input" name="email" 
							value={email} 
							onChange={this.changeHandlerEmail}
							onFocus={this.changeFocusEmail}
							onBlur={this.changeBlurEmail}
						/>
						<label className="form-label" htmlFor="email">EMAIL</label>
						<span className="form-bottom-border"></span>
					</div>
					<div className="form-input-container">
						{errorDescription ? <p className="form-error-textarea-description">Description can be less 20 symbols!</p> : null}
						<textarea className="form-textarea" name="description" 
							value={description} 
							onChange={this.changeHandlerDescription}
							onFocus={this.changeFocusDescription}
							onBlur={this.changeBlurDescription}
						/>
						<label className="form-label-textarea" htmlFor="description">Description</label>
						<span className="form-bottom-border-textarea"></span>
					</div>
					<button type="submit" className="form-subscribe-btn">SUBSCRIBE</button>
				</form>
			</div>
			
		)
	}
}

export default Contacts;