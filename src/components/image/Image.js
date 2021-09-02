import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Images extends React.Component {
	constructor(props) {
		super(props);

		//set in DOM element in component
		this.turnRef = React.createRef();

		this.turnRightImage = this.turnRightImage.bind(this);
		//this.growImage = this.growImage.bind(this);
		this.defaultSettings = this.defaultSettings.bind(this);
	}

	turnRightImage(e) {
		let img = this.turnRef.current.querySelector('.services-image');
		console.log(img)
		if(img.style.transform === "" || img.style.transform === "rotate(0deg)" || img.style.transform === "rotate(360deg)")
			img.style['transform'] = "rotate(90deg)";
		else if(img.style.transform === "rotate(90deg)")
			img.style['transform'] = "rotate(180deg)";
		else if(img.style.transform === "rotate(180deg)")
			img.style['transform'] = "rotate(270deg)";
		else if(img.style.transform === "rotate(270deg)")
			img.style['transform'] = "rotate(360deg)";
	}

	// growImage(e) {
	// 	e.preventDefault();
	// 	let img = this.turnRef.current.querySelector('.services-image');
	// 	let parent = e.target.parentNode.parentNode;
	// 	console.log(parent)
	// 	//parent.style['z-index'] = '1000';
	// 	img.style.width = '600px';
	// 	img.style.height = '450px';
	// 	img.style['position'] = 'absolute';
	// 	img.style['top'] = '0px';
	// 	img.style['left'] = '-40px';
	// 	img.style['z-index'] = '100';
	// }

	defaultSettings() {
		let img = this.turnRef.current.querySelector('.services-image');
		img.style.width = '300px';
		img.style.height = '300px';
		img.style.position = 'absolute';
		img.style['top'] = '0px';
		img.style['left'] = '-40px';
		img.style['z-index'] = '1';
		img.style['transform'] = "rotate(0deg)";
	}

	render() {
		const { url, public_id, _id } = this.props.data;

		return (
			<Fragment>
				{url ? <div ref={this.turnRef} className="services-image-container">
							<img src={url} className="services-image"  alt="galery-img" onClick={this.defaultSettings}/>
							<div className="services-image-backside">
								<FontAwesomeIcon icon="times" className="services-image-remove" onClick={() => this.props.removeImage(public_id, _id)}/>
								<FontAwesomeIcon icon="share" className="services-image-share" onClick={this.turnRightImage}/>
								<FontAwesomeIcon icon="eye" className="services-image-eye" onClick={() => this.props.growImage(this.turnRef.current)}/>
							</div>
						</div> : null}
			</Fragment>
		)
	}
}

export default Images;