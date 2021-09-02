import cookie from 'react-cookies';
import RequestUser from './RequestUser';
import myToastr from './toastr';
let data = {};

async function userData() {
	const token = cookie.load('token');
	const userId = cookie.load('e-jwt[@$64^id]!');

	if(token !== undefined && userId !== undefined && data === {}) {
		try {
			const user = await RequestUser.userData(userId, token);
			data = user;
			return user;
		} catch(err) {
			if(err.response.data !== undefined)
				myToastr.error(`${err.response.data.message}`);
			else 
				myToastr.error(`${err}`);
		}
	} else if(token !== undefined && userId !== undefined && data !== {}) {
		return data;
	}

	return null
}

export default userData;