import React from 'react';
import AuthContext from '../../services/authContext';
import RequestCard from '../../utilities/RequestCard';
import { Redirect, withRouter } from "react-router-dom";
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import auth from  '../../utilities/auth';
import Error from '../../utilities/error';
import RequestCloudinary from '../../utilities/RequestCloudinary';

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

	handleCreateCard = (e) => {
		e.preventDefault();
		const { make, model, url, color, price } = this.state;

		if(make === '') return myToastr.error('Make is required!');
		if(model === '') return myToastr.error('Model is required!');
		if(url === '') return myToastr.error('URL is required!');
		if(color === '') return myToastr.error('Color is required!');
		if(price === '') return myToastr.error('Price is invalid a number!');

		const adminToken = cookie.load('a-%l@z_98q1&');
		if(!adminToken) {
			myToastr.error('Invalid credentials! Unauthorized!');
			return this.props.history.push('/sign-in');
		}

		const newCard = { make, model, imageUrl: url, color, price: price };
		RequestCard.createCard(newCard, adminToken)
			.then((data) => {
				myToastr.success(`${data.data.message}`);
				this.setState({ redirect: '/' });
			}).catch(err => {
				if(err.response.data.message !== undefined)
					myToastr.error(`${err.response.data.message}`);
				else 
					myToastr.error(`${err}`);
			});
	}

	loadProfileFromCloudinary() {
		const { user } = this.state;
    
		if(user !== null && user.profileKey !== '') {
			RequestCloudinary.profileImage(user.profileKey)
			.then(res => {
				this.setState({ imageUrl: res.config.url});
			}).catch(err => Error(err));
		}
	}

	render () {
		const { user, imageUrl } = this.state;
		const { profileImageUrl } = this.context;

		if (this.state.redirect) {
    		return <Redirect to={this.state.redirect} />
  		}
	
		return (
			<div className="primary-container">
				<h2>My Room</h2>
				<div className="my-room-forms">
					<div>
						{user ? <p><span>First name:</span> <b>{user.firstName}</b></p> : null}
						{user ? <p><span>Last name:</span> <b>{user.lastName}</b></p> : null}
						{user ? <p><span>Age:</span> <b>{user.age}</b></p> : null}
						{user ? <p><span>City:</span> <b>{user.city}</b></p> : null}
						{user ? <p><span>PhoneNumber:</span> <b>{user.phoneNumber}</b></p> : null}
						{user ? <p><span>Email:</span> <b>{user.email}</b></p> : null}
						{/* {user ? <p><span>Rent cars:</span> <b>{user.carsHistory.length}</b></p> : null} */}
						<hr></hr>
						<p>You have image file? You want to shows it? You want to upload, do it!</p>
						{profileImageUrl 
							? <img className="my-room-profile-img-photo" src={profileImageUrl} alt="profile-img"/> 
							: imageUrl 
								? <img className="my-room-profile-img-photo" src={imageUrl} alt="profile-img"/> 
								: <h3>No upload image!</h3>
						}
						<button type="button" className="my-room-upload-image-btn" onClick={this.props.widget}>Upload Image</button>
					</div>
					{auth.isAdmin() ? <div>
						<h3>Only Admin can created rent cars!</h3>
						<form className="my-room-create-card-form" onSubmit={this.handleCreateCard}>
							<h2>Form Car</h2>
							<div>Some time you can't paste url address? solution: Refresh your browser or close brouser and log in agains!</div>
							<input id="make" className="my-room-create-card-input" placeholder="make" onChange={this.changeHandler}/>
							<input id="model" className="my-room-create-card-input" placeholder="model" onChange={this.changeHandler}/>
							<input id="url" className="my-room-create-card-input" type="text" placeholder="url address" onChange={this.changeHandler}/>
							<input id="color" className="my-room-create-card-input" placeholder="color" onChange={this.changeHandler}/>
							<input id="price" className="my-room-create-card-input" placeholder="price" onChange={this.changeHandler}/>
							<button type="submit" className="my-room-forms-create-btn">Create</button>
						</form>
					</div>: null}
				</div>
			</div>
		)
	}
}

MyRoom.contextType = AuthContext;

export default withRouter(MyRoom);