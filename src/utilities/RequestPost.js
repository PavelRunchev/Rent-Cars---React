import axios from 'axios';
const host = 'http://localhost:8080';

let RequestPost = { 
	createPost: (data, token) => {
		return axios.post(`${host}/post/createPost`, {
			method: 'POST',
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

	allPosts: () => {
		return axios.get(`${host}/post/allPosts`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			}
		}).then(res => {
			return res;
		});
	},

	removePost: (id, token) => {
		return axios.delete(`${host}/post/removePost/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
				'authorization': 'Bearer ' + token
			}
		}, { 
			withCredentials: true,
			credentials: 'include',
			headers: { 'authorization': 'Bearer ' + token,
		 }
		}).then(res => {
			return res;
		});
	}
};

export default RequestPost;