import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../services/authContext';

import RequestCard from '../../utilities/RequestCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import auth from '../../utilities/auth';


// import { Provider as YallProvider, YallImg } from 'react-yall';

// const options = {
// 	lazyClass: "lazy",
//     lazyBackgroundClass: "lazy-bg",
//     lazyBackgroundLoaded: "lazy-bg-loaded",
//     idlyLoad: false,
//     idleLoadTimeout: 100,
//     threshold: 200,
// };

class Car extends Component {
	constructor(props) {
		super(props);

		this.state = {
			car: this.props.car,
			id: this.props.id,
			like: this.props.car.like,
			isRent: false,
		}

		this.clickHandlerAuth = this.clickHandlerAuth.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.handleDislike = this.handleDislike.bind(this);
	}

	componentDidUpdate() { }

	clickHandlerAuth() {
		if(this.state.isRent) {
			this.setState({ isRent: false });
		} else {
			this.setState({ isRent: true });
		}
	}

	handleLike(id) {
		const token = cookie.load('token');
		if(!token) {
			myToastr.error('Log in your account!');
			return this.props.history.push('/sign-in');
		}

		RequestCard.updateLike(id, token)
			.then((data) => {
				this.setState({ like: data.data.like });
				this.props.isChange();
				myToastr.success('You have like successfully');
			}).catch(err => {
				if(err.response.data.message !== undefined)
					myToastr.error(`${err.response.data.message}`);
				else 
					myToastr.error(`${err.message}`);
			});
	}

	handleDislike(id) {
			const token = cookie.load('token');
		if(!token) {
			myToastr.error('Log in your account!');
			return this.props.history.push('/sign-in');
		}

		RequestCard.updateDislike(id, token)
			.then((data) => {
				this.setState({ like: data.data.like });
				this.props.isChange();
				myToastr.success('You have dislike successfully');
			}).catch(err => {
				if(err.response.data.message !== undefined)
					myToastr.error(`${err.response.data.message}`);
				else 
					myToastr.error(`${err.message}`);
			});
	}

	render () {
		const { car, isRent, like } = this.state;
		const user = this.context;
		const rentedCar = user ? <p className="rent-content-rented">It was took rented from {user.username}!</p> : null;
		const freeRentCar = <p className="rent-content-free">Free for renting!</p>
		
		return (
			<div className="car">
				<div className="car-title">
					<h2 className="car-h2">{car.make}</h2>
					<h2 className="car-h2">{car.model}</h2>
					{auth.isAdmin() ? <FontAwesomeIcon icon="trash" className="car-trash-btn" onClick={(e) => this.props.removeCar(e, car._id)}/>: null}
				</div>
				<div className="car-body">
					<img className="lazy car-body-image" src={car.imageUrl} alt="img-galery"/>
					<div className="car-body-stats">
						<p className="card-p-optional">Color: <strong>{car.color}</strong></p>
						<p className="card-p-optional">Price: <strong className="card-price">{car.price}</strong> <span className="card-dollars">$</span></p>
						<p>Like: {like}</p>
					</div>
				</div>
				<div className="car-footer">
					{auth.isLogged() ? <button onClick={this.clickHandlerAuth} className="car-sign-in-btn">Rent</button>: null}
					{auth.isLogged() 
						? 	<div className="contaianer-btn">
								<button onClick={() => this.handleLike(car._id)} className="like-btn">LIKE</button>
								<button onClick={() => this.handleDislike(car._id)} className="dislike-btn">DISLIKE</button>
							</div>
						: null
					}
				</div>
				
				{isRent ? rentedCar : freeRentCar}
			</div>
		);
	}
}

// second type for Context API without Consumer
Car.contextType = AuthContext;

export default withRouter(Car);