import axios from 'axios';
const host = 'http://localhost:8080';

let RequestCard = {
	createCard: (newCard, token) => {
		return axios.post(`${host}/card/createCard`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(newCard)
		}, { 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},
	

	getAllCards: () => {
		return axios.get(`${host}/card/all`, {
			method: 'GET',
			credentials: 'samo-origin',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			return res;
		});
	},

	removeCard: (id, token) => {
		return axios.delete(`${host}/card/delete/${id}`, {
			method: 'DELETE',
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

	updateLike: (id, token) => {
		return axios.put(`${host}/card/updateLike/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			}
		},{ 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},

	updateDislike: (id, token) => {
		return axios.put(`${host}/card/updateDislike/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 
				'X-Custom-Header': 'rentCar',
				'X-Requested-With': 'XMLHttpRequest',
			}
		},{ 
			withCredentials: true,
			headers: { 'authorization': 'Bearer ' + token }
		}).then(res => {
			return res;
		});
	},

	cancel: () => {
		return ''
	}
}


export default RequestCard;