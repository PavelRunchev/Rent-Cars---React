import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import AuthContext from '../../services/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import auth from '../../utilities/auth';
import RequestUser from '../../utilities/RequestUser';
import RequestCloudinary from '../../utilities/RequestCloudinary'
import myToastr from '../../utilities/toastr';
import cookie from 'react-cookies';
import Error from '../../utilities/error';
import logo from '../../public/logo-of-car-rent.jpg';

import navigationMediaQuery from '../../services/navigationMediaQuery';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageUrl: null,
			user: null,
			isShowDownBar: false,
			isShowMyProfile: false
		}

		this.clickHandleHome = this.clickHandleHome.bind(this);
		this.clickHandleAbout = this.clickHandleAbout.bind(this);
		this.clickHandleContacts = this.clickHandleContacts.bind(this);
		this.clickHandleGallery = this.clickHandleGallery.bind(this);
		this.clickHandleMyRoom = this.clickHandleMyRoom.bind(this);
		this.clickHandleSignIn = this.clickHandleSignIn.bind(this);
		this.clickHandlesignUp = this.clickHandlesignUp.bind(this);
		this.clickHandleMenu = this.clickHandleMenu.bind(this);

		this.clickHandlerShowProfile = this.clickHandlerShowProfile.bind(this);
		this.clickHandlerLogout = this.clickHandlerLogout.bind(this);
	}

	async componentDidMount() {
		document.querySelector('.navigation').style.height = '85px';
		await navigationMediaQuery();
		await this.requestForUserData();
		await this.loadProfileFromCloudinary();
		await this.setDownBorderToCurrentLink("home");
	}

	async componentDidUpdate() {
		await this.requestForUserData();
		await this.loadProfileFromCloudinary();
		await this.setDownBorderToCurrentLink();
	}

	clickHandleHome(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleAbout(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleContacts(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	async clickHandleMenu(e) {
		e.preventDefault();
		const { isShowDownBar } = this.state;


		if (!isShowDownBar) {
			await this.setState({ isShowDownBar: true });
			let downBarMenu = await document.querySelector('.navigation-down-menu');
			downBarMenu.animate(
				[{ opacity: '0', transform: 'translateY(0px)' },
				{ opacity: '1', transform: 'translateY(235px)' }],
				{
					duration: 400,
					easeing: "ease-out",
					delay: 0,
					fill: "forwards",
				});
		} else {
			let downBarMenu = await document.querySelector('.navigation-down-menu');
			await downBarMenu.animate(
				[{ transform: 'translateY(235px)' }, 
				{ transform: 'translateY(0px)' }],
				{
					duration: 400,
					easeing: "ease-out",
					delay: 0,
					fill: "forwards",
				});
			downBarMenu.style["opacity"] = '0';
			setTimeout(async () => {
				await this.setState({ isShowDownBar: false });
			}, 500);
		}

		await this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleGallery(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleMyRoom(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleSignIn(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandlesignUp(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	setDownBorderToCurrentLink(name) {
		const allLinks = document.querySelectorAll('.navigation-list a');
		let media = window.matchMedia('(min-width: 900px)');
		if (media.matches) {
			for (let a of allLinks) {
				if (a.className === name) a.style["border-bottom"] = '2px solid rgba(69,117,182, 1)';
				else a.style["border-bottom"] = '2px solid transparent';
			}
		} else {
			for (let a of allLinks) {
				a.style["border-bottom"] = '2px solid transparent';
			}
		}
	}

	clickHandlerShowProfile(e) {
		e.preventDefault();
		const { isShowMyProfile } = this.state;
		let profile = document.querySelector('.navigation-my-profile');
		if (profile.style.opacity === '' || profile.style.opacity === '0') {
			profile.style["transition"] = 'all 0.4s';
			profile.style["width"] = '250px';
			profile.style["height"] = '350px';
			profile.style.opacity = '1';
			profile.style['z-index'] = '999';
		} else {
			profile.style["transition"] = 'all 0.4s';
			profile.style["width"] = '0px';
			profile.style["height"] = '0px';
			profile.style['z-index'] = '-1';
			profile.style.opacity = '0';

		}

		this.setState({ isShowMyProfile: !isShowMyProfile });
	}

	clickHandlerLogout(e) {
		e.preventDefault();

		const token = cookie.load('token');
		if (!token) {
			myToastr.error('Log in your account!');
			return this.props.history.push('/sign-in');
		}

		RequestUser.logOut(token)
			.then(() => {
				//remove token from react
				cookie.remove('e-jwt[@$64^id]!', { path: '/' });
				myToastr.info('Log out successful');
				let profile = document.querySelector('.my-profile');
				profile.style["transition"] = 'all 0.4s';
				profile.style["width"] = '0px';
				profile.style.opacity = '0';
				profile.style['z-index'] = '-1';
				this.setState({ user: null, imageUrl: null });
				this.props.history.push('/');
			}).catch(err => Error(err));
	}

	requestForUserData() {
		const { user } = this.state;

		if (cookie.load('token') !== undefined && cookie.load('e-jwt[@$64^id]!') !== undefined && user === null) {
			const token = cookie.load('token');
			const userId = cookie.load('e-jwt[@$64^id]!');
			RequestUser
				.userData(userId, token)
				.then(data => {
					this.setState({ user: data.data });
					this.props.getData(data.data);
				}).catch(err => {
					if (err.message === 'Network Error') {
						return this.props.errorIsNetwotk(true);
					} else
						Error(err);
				});
		}
	}

	loadProfileFromCloudinary() {
		const { user, imageUrl } = this.state;

		if (user !== null && imageUrl === null && user.profileKey !== '') {
			RequestCloudinary.profileImage(user.profileKey)
				.then(res => {
					this.setState({ imageUrl: res.config.url });
				}).catch(err => {
					if (err.message === 'Network Error') {
						return this.props.errorIsNetwotk(true);
					} else
						Error(err);
				});
		}
	}

	render() {
		const { user, imageUrl, isShowDownBar, isShowMyProfile } = this.state;
		const { profileImageUrl } = this.context;

		return (
			<>
				<nav className="navigation">
					<div className="navigation-logo-container">
						<img src={logo} className="navigation-logo" alt="logo" />
					</div>

					<div className="navigation-second-container">
						<ul className="navigation-list">
							<li className="navigation-item">
								<NavLink className="home navigation-link-hover-link" onClick={this.clickHandleHome} to="/home" replace >Cars</NavLink>
								<span className="navigation-link-hover-line"></span>
							</li>
							<li className="navigation-item">
								<NavLink className="about navigation-link-hover-link" onClick={this.clickHandleAbout} to="/about" replace>About</NavLink>
								<span className="navigation-link-hover-line"></span>
							</li>
							<li className="navigation-item">
								<NavLink className="contacts navigation-link-hover-link" onClick={this.clickHandleContacts} to="/contacts" replace>For Us</NavLink>
								<span className="navigation-link-hover-line"></span>
							</li>
							<li className="navigation-item">
								<NavLink className="menu navigation-link-hover-link" to="/menu" onClick={this.clickHandleMenu} replace>
									Menu {isShowDownBar
										? <FontAwesomeIcon icon="angle-up" className="navigation-menu-angle-down" />
										: <FontAwesomeIcon icon="angle-down" className="navigation-menu-angle-down" />}
								</NavLink>
								<span className="navigation-link-hover-line"></span>
							</li>
						</ul>
					</div>

					{auth.isLogged()
						? <div className="navigation-my-profile-container">
							<NavLink className="navigation-profile" onClick={this.clickHandlerShowProfile} to="#" replace>
								{user !== null ? user.email : null}
								{isShowMyProfile
									? <FontAwesomeIcon icon="caret-up" className="navigation-profile-icon-caret-down" />
									: <FontAwesomeIcon icon="caret-down" className="navigation-profile-icon-caret-down" />}
							</NavLink>


							<div className="navigation-my-profile">
								{profileImageUrl
									? <img src={profileImageUrl} className="navigation-profile-image" alt="profile-img" />
									: imageUrl
										? <img src={imageUrl} className="navigation-profile-image" alt="profile-img" />
										: user !== null
											? <img src={user.profileImageUrl} className="navigation-profile-image" alt="profile-img" />
											: null}
								<h3 className="navigation-my-profile-title">{user !== null ? `Hello ${user.firstName}` : null}</h3>
								<ul className="navigation-my-profile-list">
									<li className="navigation-my-profile-item">
										<NavLink className="gallry navigation-my-profile-link" onClick={this.clickHandleGallery} to="/gallery" replace>Gallery</NavLink>
										<FontAwesomeIcon icon="th" className="navigation-my-profile-link-icon" />
									</li>
									<li className="navigation-my-profile-item">
										<NavLink className="navigation-my-profile-link" onClick={this.clickHandleMyRoom} to="/my-room" replace>My Room</NavLink>
										<FontAwesomeIcon icon="user-check" className="navigation-my-profile-link-icon" />
									</li>
									<li className="navigation-my-profile-item">
										<Link className="log-out navigation-my-profile-link" onClick={(e) => this.clickHandlerLogout(e)} to="/" replace>Log out</Link>
										<FontAwesomeIcon icon="sign-out-alt" className="navigation-my-profile-link-icon" />
									</li>
								</ul>

							</div>
						</div>
						: <ul className="navigation-profile-list">
							<li className="navigation-profile-item">
								<NavLink className="sign-in navigation-profile-link" onClick={this.clickHandleSignIn} to="/sign-in" replace>Sign In</NavLink>
								<span className="navigation-profile-link-hover-line"></span>
							</li>
							<li className="navigation-profile-item">
								<NavLink className="sign-up navigation-profile-link" onClick={this.clickHandlesignUp} to="/sign-up" replace>Sign Up</NavLink>
								<span className="navigation-profile-link-hover-line"></span>
							</li>
						</ul>
					}

					<FontAwesomeIcon icon="bars" className="navigation-bars-btn" />
				</nav>
				{isShowDownBar ? <div className="navigation-down-menu">
					<ul className="navigation-down-menu-list">
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/driver-requirement" replace>Driver requirement</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/payment" replace>Payment, fees confirmation</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/my-booking" replace>My booking</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/after-rental" replace>After rental</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
					</ul>
					<ul className="navigation-down-menu-list">
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/fuel" replace>Fuel and cross border</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/protection-service" replace>Protection service</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/optional-equipment" replace>Optional equipment</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/drop-off" replace>Pickup and drop off</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
					</ul>
					<ul className="navigation-down-menu-list">
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/careers" replace>Careers</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/managers" replace>Managers</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/car-rent-locations" replace>Car Rental Locations</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
						<li className="navigation-down-menu-item">
							<NavLink className="navigation-down-menu-link" to="/travel-tips" replace>Travel Tips</NavLink>
							<FontAwesomeIcon icon="caret-right" className="navigation-down-menu-link-caret-right" />
						</li>
					</ul>
				</div> : null}
			</>
		)
	}
}

Navigation.contextType = AuthContext;

export default withRouter(Navigation);

