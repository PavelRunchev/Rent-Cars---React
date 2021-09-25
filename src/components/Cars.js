import { Component } from 'react';
import cookie from 'react-cookies';
import Error from '../utilities/error';
import RequestCard from '../utilities/RequestCard';
import myToastr from '../utilities/toastr';
import Car from './Car/Car';
import Loading from './Loading/Loading';
import RemoveMessage from './User/RemoveMessage';

class Cars extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			cars: [],
			isChange: false,
			isRemoveMessageShow: false,
			removeCarId: null,
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
					if(err.message === 'Network Error') {
						return this.props.errorIsNetwotk(true);
					} else 
						Error(err);
				});
		}
	}

	changeHandler = async () => {
		if(this._isMounted) {
			await this.loadingCars();
			this.setState({ isChange: true});
		}
	}

	removeMessageIsShow = async (e, _id) => {
		e.preventDefault();
		//Show animation for remove message from sscs animation!
		//Posible is here!
		await this.setState({ isRemoveMessageShow: true, removeCarId: _id });
	}

	removeMessageIsHide = async (e) => {
		e.preventDefault();
		await this.removeMessageHideAnimation();
	}

	removeMessageHideAnimation() {
		//Hide animation for hide remove message!
		let rm = document.querySelector('.remove-message-container');
		rm.animate([{ opacity: '1' }, { opacity: '0', display: 'none' }], 
				{
					duration: 400,
					easeing: "ease-out",
					delay: 0,
					fill: "forwards",
				});
		setTimeout(async () => {
			if(this._isMounted) {
				await this.setState({ isRemoveMessageShow: false });
			}
		}, 400);	
	}

	async removeCar(e) {
		e.preventDefault();
		const { removeCarId } = this.state;
		// delete post fetch and filter posts array
		if(this._isMounted) {
			try {
				const adminToken = await cookie.load('a-%l@z_98q1&');
				if(!adminToken) {
					this.removeMessageHideAnimation();
					this.postsContainerMove('scale(1) translate(0px, 0px)', '1', 'translate(-410px, 0px)', '0');
					myToastr.error('Log in your account!');
					return this.props.history.push('/sign-in');
				}

				const res = await RequestCard.removeCard(removeCarId, adminToken);
				if(res.status === 200 && this._isMounted) {
					let filteredCars = await [...this.state.cars].filter(i => i._id !== removeCarId);
					await this.setState({ cars: filteredCars, removeCarId: null });
					myToastr.info(res.data.message);
					this.removeMessageHideAnimation();
				}
			} catch(err) {
				if(err.message === 'Network Error') {
					this.props.errorIsNetwotk(true);
				} else if(err.response !== undefined) {
					this.removeMessageHideAnimation();
					myToastr.error(`${err.response.data.message}`);
				} else {
					const isSetState = Error(err);
					if(isSetState)
						this.setState({ redirect: '/error/internal-server-error' });
				}
			};
		}
	}

	render () {
		const { isLoading, cars, isRemoveMessageShow } = this.state;

		if(this._isMounted) {
			return (
				<>
					<div className="primary-container">
						<div className="container">
							{isLoading === true ? <Loading />
									: cars.length === 0 ? 
										<h2>No Cars!</h2> 
										: cars.map((c, i) => {
											return <Car key={c._id} car={c} 
													removeCar={this.removeMessageIsShow}
													isChange={this.changeHandler}
												/>
										})
							}
						</div>
					</div>

					{isRemoveMessageShow 
						? <RemoveMessage 
							isRemoveMessageHide={this.removeMessageIsHide} 
							removeItem={this.removeCar} 
							title={'Car'} 
							content={'car'} 
						  /> 
						: null}
				</>
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