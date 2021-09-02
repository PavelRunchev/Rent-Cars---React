import axios from 'axios';
const host = 'http://localhost:8080';

let RequestCloudinary = { 
	profileImage: (public_key) => {
		return axios.get(`https://res.cloudinary.com/raiders/image/upload/${public_key}.jpg`)
			.then(res => {
				return res;
			});
	},

	gallery: () => {
		return axios.get(`https://res.cloudinary.com/raiders/image/list/gallery.jpg`)
			.then(res => {
				return res;
			});
	},

	getImage: (data) => {
		return axios.get(`https://res.cloudinary.com/raiders/image/${data.type}/${data.public_id}.jpg`)
			.then(res => {
				return res;
			});
	},

	uploadImage: (data, token) => {
		return axios.post(`${host}/image/uploadImage}`, {
			method: "POST",
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
	}
};

export default RequestCloudinary;