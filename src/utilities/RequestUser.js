import axios from 'axios';
const host = 'http://localhost:8080';

let RequestUser = {
	signUp: (newUser) => {
		return axios.post(`${host}/user/sign-up`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', withCredentials: true, credentials: 'include' },
			body: JSON.stringify(newUser)
		}, { withCredentials: true }
		).then(res => {
			return res;
		});
	},

	signIn: (user) => {
		return axios.post(`${host}/user/sign-in`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest'
			},
			body: JSON.stringify(user)
		}, { withCredentials: true }
		).then(res => {
			return res;
		});
	},

	logOut: (token) => {
		return axios.post(`${host}/user/logout`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			}
		}, { 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},

	updateProfileImage: (data, token) => {
		return axios.put(`${host}/user/updateProfileImage`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(data)
		}, { 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},

	userData: (id, token) => {
		return axios.post(`${host}/user/restoreUserData/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			}
		}, { 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},

	
}

export default RequestUser;