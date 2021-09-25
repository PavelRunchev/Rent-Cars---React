import React from 'react';
import { withRouter } from 'react-router';
import Images from './image/Image';
import Loading from './Loading/Loading';
import RequestImage from '../utilities/RequestImage';
import myToastr from '../utilities/toastr';
import Error from  '../utilities/error';
import auth from '../utilities/auth';
import cookie from 'react-cookies';

class Gallery extends React.Component {	
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			pictures: [],
			isLoading: true
		}

		this.refreshCloudinaryImages = this.refreshCloudinaryImages.bind(this);
		this.getAllImages = this.getAllImages.bind(this);
		this.openWidget = this.openWidget.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.growImage = this.growImage.bind(this);
	}

	async componentDidMount() {
		await this.isMountedTrue();
		await this.getAllImages();
	}

	shouldComponentUpdate(nextProps, nextState) {
		//That change cars in STATE invoke render!
		if(this.state.pictures !== nextState.pictures) {
			return true;
		}

		return false;
	}

	isMountedTrue() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	async getAllImages() {
		const token = await cookie.load('token');
		if(!token) return myToastr.error('Login your an account!');

		if(this._isMounted) {
			const userId = await cookie.load('e-jwt[@$64^id]!');
			RequestImage.getAllImages(userId, token)
				.then((data) => {
					if(this._isMounted) 
						this.setState({ pictures: data.data.data, isLoading: false });
				}).catch(err => {
					if(err.message === 'Network Error') {
						return this.props.errorIsNetwotk(true);
					} else if(err.response.data.message !== undefined)
						myToastr.error(`${err.response.data.message}`);
					else 
						myToastr.error(`${err}`);
				});
		}	
	}

	async openWidget(ev) {
		const token = await cookie.load('token');
		if(!token) return myToastr.error('Login your an account!');

		if(auth.isLogged()) {
			const userId = await cookie.load('e-jwt[@$64^id]!');
			const widget = window.cloudinary.createUploadWidget({
			cloudName: `raiders`,
			uploadPreset: "profile2",
			tags: ['gallery']
			}, async (error, result) => {
				if(error) Error(error);

				if(result.event === 'success') {
						const newUploadImage = { 
							created_at: result.info.created_at,
							format: result.info.format,
							public_id: result.info.public_id,
							type: result.info.type,
							version: result.info.version,
							url: result.info.url,
							tags: result.info.tags,
							delete_token: result.info.delete_token,
							path: result.info.path,
							access_mode: result.info.access_mode,
							height: result.info.height,
							width: result.info.width,
							creator: userId
						};
					try {
						const data = await RequestImage.uploadImage(newUploadImage, token);
						if(this._isMounted) {
							let newArr = [...this.state.pictures];
							newArr.unshift(data.data.data);
							this.setState({ pictures: newArr });
						}
		
						myToastr.info(`${data.data.message}`);
					} catch(err) {
						Error(err);
					}
				}
			});

			widget.open();
		} else {
			myToastr.error('You have need account!');
		}
	}

	async refreshCloudinaryImages() {
		console.log('refresh')
		this.getAllImages();
	}

	async removeImage(public_id, _id) {
		//problem no remove this clicked!!!
		const token = cookie.load('token');
		if(!token) {
			myToastr.error('Log in your account!');
			return this.props.history.push('/sign-in');
		}

		try {
			const res = await RequestImage.removeImage(public_id, _id, token);
			if(res.status === 200 && this._isMounted) {
				let newArr = await [...this.state.pictures].filter(i => i._id !== _id);
				await this.setState({ pictures: newArr });
			} 
			myToastr.info(res.data.message);
		} catch(err) {
			Error(err);
		}
	}

	growImage(e) {
		let i = e.firstChild;
		i.style.width = 'calc(100% * 2';
		i.style.height = 'calc(100% * 2';
		i.style['position'] = 'relative';
		i.style['top'] = '0px';
		i.style['left'] = '-40px';
		e.style['z-index'] = '100';
	}

	render () {
		const { pictures, isLoading } = this.state;
		
		return ( 
			<div className="primary-container">
				<h2 className="o-h2">Gallery Section</h2>
				<div className="services-gallery-container">
					{isLoading 
						? <Loading /> 
						: pictures.length !== 0 
							? pictures.map((c,i) => {
								return <Images key={i} data={c} removeImage={this.removeImage}  growImage={this.growImage}/>
							}) 
							: <h2>No Upload Images!</h2>}
				</div>
				
				<p className="gallery-btn-upload-info">After upload wait few minutes and refresh!</p>
				<div className="gallery-btn-upload-container">
					<button type="button" id="upload_widget" className="my-room-upload-image-btn gallery-btn-upload" onClick={this.openWidget}>Upload Image</button>
					<button type="button" className="my-room-upload-image-btn gallery-btn-refresh" onClick={this.refreshCloudinaryImages}>Refresh Image</button>
				</div>
			</div>
		)
	}
}

export default withRouter(Gallery);