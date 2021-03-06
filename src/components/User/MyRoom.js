import React from 'react';
import AuthContext from '../../services/authContext';
import RequestCard from '../../utilities/RequestCard';
import { Redirect, withRouter } from "react-router-dom";
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import auth from  '../../utilities/auth';

import RequestCloudinary from '../../utilities/RequestCloudinary';
import { MDBInput, MDBSwitch } from 'mdb-react-ui-kit';

class MyRoom extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			make: '',
			model: '',
			url: '',
			color: '',
			price: '',
			power: '',
			fuel: '',
			gearBox: '',
			seats: '',
			doors: '',
			tires: '',
			luggage: '',
			navigation: false,
			redirect: null,
			user: null,
			imageUrl: null
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		if(this._isMounted && this.state.user === null)
			await this.setState({ user: this.context.user });

		await this.loadProfileFromCloudinary();
	}

	async componentWillUnmount() {
		//We are unmounting the component clear function setTimeout with cleatTimeout!
		//Because, otherwise throw error!
		this._isMounted = false;
	}

	changeHandler = (e) => {
		//require input id!!!
		this.setState({ [e.target.id]: e.target.value });
	}

	changeHandlerSwitch = (e) => {
		this.setState({ navigation: e.target.checked });
	}

	handleCreateCard = (e) => {
		e.preventDefault();
		const { make, model, url, color, price, fuel, power, gearBox, seats, doors, tires, luggage, navigation } = this.state;

		if(make === '') return myToastr.error('Make is required!');
		if(model === '') return myToastr.error('Model is required!');
		if(url === '') return myToastr.error('URL is required!');
		if(color === '') return myToastr.error('Color is required!');
		if(price === '') return myToastr.error('Price is invalid a number!');

		//todo add other fields!

		const adminToken = cookie.load('a-%l@z_98q1&');
		if(!adminToken) {
			myToastr.error('Invalid credentials! Unauthorized!');
			return this.props.history.push('/sign-in');
		}

		// const newCard = { make, model, imageUrl: url, color, price: price };
		// RequestCard.createCard(newCard, adminToken)
		// 	.then((data) => {
		// 		myToastr.success(`${data.data.message}`);
		// 		this.setState({ redirect: '/' });
		// 	}).catch(err => {
		// 		if(err.message === 'Network Error') {
		// 			return this.props.errorIsNetwotk(true);
		// 		} else if(err.response.data.message !== undefined)
		// 			myToastr.error(`${err.response.data.message}`);
		// 		else 
		// 			myToastr.error(`${err}`);
		// 	});
	}

	loadProfileFromCloudinary() {
		const { user } = this.state;
    
		if(user !== null && user.profileKey !== '') {
			RequestCloudinary.profileImage(user.profileKey)
			.then(res => {
				this.setState({ imageUrl: res.config.url});
			}).catch(err => {
				if(err.message === 'Network Error') {
					return this.props.errorIsNetwotk(true);
				} else if(err.response.data.message !== undefined)
					myToastr.error(`${err.response.data.message}`);
				else 
					myToastr.error(`${err}`);
			});
		}
	}

	render () {
		const { user } = this.state;
		const { profileImageUrl } = this.context;

		if (this.state.redirect) {
    		return <Redirect to={this.state.redirect} />
  		}
	
		return (
			<div className="primary-container">
				<div className="my-room">
					<div className="my-room-form">
						<div className="my-room-form-first-container">
							{user ? <p className="my-room-p"><span>First name:</span> <b>{user.firstName}</b></p> : null}
							{user ? <p className="my-room-p"><span>Last name:</span> <b>{user.lastName}</b></p> : null}
							{user ? <p className="my-room-p"><span>Age:</span> <b>{user.age}</b></p> : null}
							{user ? <p className="my-room-p"><span>City:</span> <b>{user.city}</b></p> : null}
							{user ? <p className="my-room-p"><span>PhoneNumber:</span> <b>{user.phoneNumber}</b></p> : null}
							{user ? <p className="my-room-p"><span>Email:</span> <b>{user.email}</b></p> : null}
						</div>
						
						<div>
							<p className="my-room-p">You have image file? You want to shows it? You want to upload, do it!</p>
							{profileImageUrl 
								? <img className="my-room-profile-img-photo" src={profileImageUrl} alt="profile-img"/> 
								: user !== null 
									? <img className="my-room-profile-img-photo" src={user.profileImageUrl} alt="profile-img"/> 
									: <h3 className="my-room-nouploadimage-h3">No upload image!</h3>
							}
							<button type="button" className="my-room-upload-image-btn" onClick={this.props.widget}>Upload Image</button>
						</div>
						
					</div>

					<hr></hr>
					{auth.isAdmin() 
						? 	<div className="my-room-admin-container">
								<h3 className="my-room-admin-container-h3">Only Admin can created rent cars!</h3>
								<form className="my-room-admin-container-form" onSubmit={this.handleCreateCard}>
									<h2 className="my-room-admin-container-form-h2">Form Car</h2>
									<div className="my-room-create-car-form-info">Some time you can't paste url address? solution one: Refresh your browser or close brouser and log in agains!</div>
									<div className="my-room-create-car-form-info">solution two: Copy link with mouse select (link blue ground font!)after paste in input fields!</div>
									<div className="my-room-admin-container-form-input-container">
										<input id="make" className="my-room-admin-container-form-input" placeholder="make" onChange={this.changeHandler}/>
										<input id="model" className="my-room-admin-container-form-input" placeholder="model" onChange={this.changeHandler}/>
									</div>
					
									<div className="my-room-admin-container-form-input-container">
										<input id="color" className="my-room-admin-container-form-input" placeholder="color" onChange={this.changeHandler}/>
										<input id="price" className="my-room-admin-container-form-input" placeholder="price" onChange={this.changeHandler}/>
									</div>

									<div className="my-room-admin-container-form-input-container">
										<input id="power" className="my-room-admin-container-form-input" placeholder="power" onChange={this.changeHandler}/>
										
									</div>

									<MDBInput label='URL address' id='url' type='url' className="my-room-admin-container-form-input-url" onChange={this.changeHandler}/>

									<div className="my-room-admin-container-form-select-advanced-options">
										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Fuel: </label>
											<select id="fuel" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
											<option>none</option>
												<option value="diesel">Diesel</option>
												<option value="benzin">Benzin</option>
												<option value="gaz">Gaz</option>
											</select>
										</div>

										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Gear box: </label>
											<select id="gearBox" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
												<option>none</option>
												<option className="my-room-admin-container-form-option">Manual</option>
												<option className="my-room-admin-container-form-option">Autovatic</option>
											</select>
										</div>
									</div>

									<div className="my-room-admin-container-form-select-advanced-options">
										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Seats: </label>
											<select id="seats" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
												<option>none</option>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
											</select>
										</div>

										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Doors: </label>
											<select id="doors" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
												<option>none</option>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</select>
										</div>
									</div>

									<div className="my-room-admin-container-form-select-advanced-options">
										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Luggage: </label>
											<select id="luggage" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
												<option>none</option>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
											</select>
										</div>

										<div className="my-room-admin-container-form-select-container">
											<label className="my-room-admin-container-form-select-label">Tires: </label>
											<select id="tires" className="my-room-admin-container-form-select" onChange={this.changeHandler}>
												<option>none</option>
												<option>wet</option>
												<option>snow</option>
											</select>
										</div>
									</div>
									
									<br />

										<div className="my-room-admin-container-form-select-advanced-options">
											<MDBSwitch defaultChecked id='flexSwitchCheckChecked' label='Navigation' onChange={this.changeHandlerSwitch}/>
										</div>
      								
      								<br />
									<button type="submit" className="my-room-admin-container-form-create-btn">Create</button>
								</form>
								<hr></hr>
							</div>
						: null
					}
				</div>
			</div>
		)
	}
}

MyRoom.contextType = AuthContext;

export default withRouter(MyRoom);