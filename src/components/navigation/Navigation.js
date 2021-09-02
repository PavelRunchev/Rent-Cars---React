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

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageUrl: null,
			user: null,
		}

		this.clickHandleHome = this.clickHandleHome.bind(this);
		this.clickHandleAbout = this.clickHandleAbout.bind(this);
		this.clickHandleContacts = this.clickHandleContacts.bind(this);
		this.clickHandleGallery = this.clickHandleGallery.bind(this);
		this.clickHandleMyRoom = this.clickHandleMyRoom.bind(this);
		this.clickHandleSignIn = this.clickHandleSignIn.bind(this);
		this.clickHandlesignUp = this.clickHandlesignUp.bind(this);

		this.clickHandlerShowProfile = this.clickHandlerShowProfile.bind(this);
		this.clickHandlerLogout = this.clickHandlerLogout.bind(this);
	}

	async componentDidMount() {
		await this.requestForUserData();
		await this.loadProfileFromCloudinary();
		await this.setDownBorderToCurrentLink("home");
	}

	async componentDidUpdate() {
		await this.requestForUserData();
		await this.loadProfileFromCloudinary();
	}

	clickHandleHome (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleAbout (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleContacts (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleGallery (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleMyRoom (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandleSignIn (e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	clickHandlesignUp(e) {
		this.setDownBorderToCurrentLink(e.target.getAttribute('class'));
	}

	setDownBorderToCurrentLink(name) {
		const allLinks = document.querySelectorAll('.navigation-list a');
		for(let a of allLinks) {
			if(a.className === name) a.style["border-bottom"] = '2px solid beige';
			else a.style["border-bottom"] = '2px solid transparent';
		}
	}

	clickHandlerShowProfile(e) {
		e.preventDefault();
		
		let profile = document.querySelector('.my-profile');
		if(profile.style.opacity === '' || profile.style.opacity === '0') {
			profile.style["transition"] = 'all 0.4s';
			profile.style["width"] = '250px';
			profile.style.opacity = '1';
			profile.style['z-index'] = '999';
		} else {
			profile.style["transition"] = 'all 0.4s';
			profile.style["width"] = '0px';
			profile.style.opacity = '0';
			profile.style['z-index'] = '-1';
		}
	}

	clickHandlerLogout(e) {
		e.preventDefault();

		const token = cookie.load('token');
		if(!token) {
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

		if(cookie.load('token') !== undefined && cookie.load('e-jwt[@$64^id]!') !== undefined && user === null) {
			const token = cookie.load('token');
			const userId = cookie.load('e-jwt[@$64^id]!');
			RequestUser
				.userData(userId, token)
				.then(data => {
					this.setState({ user: data.data });
					this.props.getData(data.data);
				}).catch(err => Error(err));
		}
  	}

	loadProfileFromCloudinary() {
		const { user, imageUrl } = this.state;
    
		if(user !== null && imageUrl === null && user.profileKey !== '') {
			RequestCloudinary.profileImage(user.profileKey)
			.then(res => {
				this.setState({ imageUrl: res.config.url});
			}).catch(err => Error(err));
		}
	}

	render () {
		const { user, imageUrl } = this.state;
		const { profileImageUrl } = this.context;

		return (
			<nav className="navigation-container">
				<ul className="navigation-list">
					<li><NavLink className="home" onClick={this.clickHandleHome} to="/home" replace >Home</NavLink></li>
					<li><NavLink className="about" onClick={this.clickHandleAbout} to="/about" replace>About</NavLink></li>
					<li><NavLink className="contacts" onClick={this.clickHandleContacts} to="/contacts" replace>Contacts</NavLink></li>
					{auth.isLogged() ? null : <li><NavLink className="sign-in" onClick={this.clickHandleSignIn} to="/sign-in" replace>Sign In</NavLink></li>}
					{auth.isLogged() ? null : <li><NavLink className="sign-up" onClick={this.clickHandlesignUp} to="/sign-up" replace>Sign Up</NavLink></li>}
				</ul>
						
				{auth.isLogged() ? <div className="my-profile-container">
					<NavLink className="nav-profile" onClick={this.clickHandlerShowProfile} to="#" replace>
						{user !== null ? user.email : null} <FontAwesomeIcon icon="caret-down" className=""/>
					</NavLink>
							
					<div className="my-profile">
								{profileImageUrl 
									? <img src={profileImageUrl} className="nav-profile-image" alt="profile-img"/> 
									: imageUrl 
										? <img src={imageUrl} className="nav-profile-image" alt="profile-img"/>
										: user !== null ? <img src={user.profileImageUrl} className="nav-profile-image" alt="profile-img"/> : null
								}
								<h3 className="my-profile-title">{user !== null ? `Hello ${user.firstName}` : null}</h3>
								<li><NavLink className="gallry" onClick={this.clickHandleGallery} to="/gallery" replace>Gallery</NavLink></li>
								<li><NavLink className="my-room" onClick={this.clickHandleMyRoom} to="/my-room" replace>My Room</NavLink></li>
								<Link className="log-out" onClick={(e) => this.clickHandlerLogout(e)}  to="/" replace>Log out</Link>
					</div>
					</div> : null}
			</nav>
		)
	}
}

Navigation.contextType = AuthContext;

export default withRouter(Navigation);