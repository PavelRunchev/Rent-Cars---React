import axios from 'axios';
const host = 'http://localhost:8080';

let RequestImage = { 
	uploadImage: (data, token) => {
		return axios.post(`${host}/image/uploadImage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest'
			},
			body: JSON.stringify(data)
		}, { withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token } 
		}).then(res => {
			return res;
		});
	},

	getAllImages: (id, token) => {
		return axios.get(`${host}/image/allImages/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest'
			}
		}, { withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token } 
		}).then(res => {
			return res;
		});
	},

	removeImage: (public_id, _id, token) => {
		return axios.post(`${host}/image/removeImage/${_id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(public_id)
		}, { 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	}
};

export default RequestImage;