import { Component } from 'react';
import { Redirect } from "react-router-dom";
import Car from './Car/Car';
import Loading from './Loading/Loading';
import RequestCard from '../utilities/RequestCard';
import myToastr from '../utilities/toastr';
import error from  '../utilities/error';
import cookie from 'react-cookies';

class Cars extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			cars: [],
			isChange: false,
			redirect: null
		}

		this.removeCar = this.removeCar.bind(this);
	}

	async componentDidMount() {
		await this.isMountedTrue();
		await this.loadingCars();
	}

	componentDidUpdate() { }

	shouldComponentUpdate(nextProps, nextState) {
		//That change cars in STATE invoke render!
		if(nextProps.cars !== nextState.cars) {
			return true;
		}

		return false;
	}

	async componentWillUnmount() {
		//We are unmounting the component clear function setTimeout with cleatTimeout!
		//Because, otherwise throw error!
		this._isMounted = false;
	}

	isMountedTrue() {
		this._isMounted = true;
	}

	async loadingCars() {
		if(this._isMounted) {
				RequestCard.getAllCards().then(data => {
					if(!data) return myToastr.error('No Cars');

					if(this._isMounted)
						this.setState({ cars: data.data.data, isLoading: false });
				}).catch(err => {
					if(err.status === 500)
					//internal server error component!
					this.setState({ redirect: '/error/internal-server-error' });
					myToastr.error(err); 
				});
		}
	}

	async removeCar(id) {
		if(this._isMounted) {
			try {
				const adminToken = cookie.load('a-%l@z_98q1&');
				if(!adminToken) {
					myToastr.error('Log in your account!');
					return this.props.history.push('/sign-in');
				}

				const data = await RequestCard.removeCard(id, adminToken);
				console.log(data)
				let newArr = await [...this.state.cars].filter(i => i._id !== id);
				await this.setState({ cars: newArr });
				myToastr.info('Car deleted successfully!');
			} catch(err) {
				const isSetState = error(err);
				if(isSetState)
					this.setState({ redirect: '/error/internal-server-error' });
			};
		}
	}

	changeHandler = async () => {
		if(this._isMounted) {
			await this.loadingCars();
			this.setState({ isChange: true});
		}
	}

	render () {
		const { isLoading, cars } = this.state;

		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		if(this._isMounted) {
			return (
				<div className="primary-container">
					<h2>Rent Cars</h2>
					<div className="container">
						{isLoading === true ? <Loading />
								: cars.length === 0 ? 
									<h2>No Cars!</h2> 
									: cars.map((c, i) => {
										return <Car key={c._id} car={c} 
												removeCar={this.removeCar}
												isChange={this.changeHandler}
											/>
									})
						}
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default Cars;

//Use Case!!!
//Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
//Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
//You have an interval (e.g. setInterval) set up in your component and within the interval this.setState() is called. If you forgot to remove the interval on componentWillUnmount(), you will update state on an unmounted component again.

//Solution - create value - _isMounted!
//Where have this.setState, we used if check _isMounted is true
//In componentWillUnmount - set _isMounted = false