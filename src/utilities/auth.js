import cookie from 'react-cookies';

let auth = {
	isLogged() {
		return cookie.load('token') !== undefined ? true : false ;
	},

	isAdmin() {
		return cookie.load('a-%l@z_98q1&') && cookie.load('token') !== undefined ? true : false;
	}
}

export default auth;