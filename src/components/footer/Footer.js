
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faInstagram, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import bitcoin from '../../public/Bitcoin-card-dark.png';
import mastercard from '../../public/MasterCard-dark.png';
import paypal from '../../public/Paypal-card-dark.png';
import imgRentCar from '../../public/rent-a-car-free-vector.jpg';
import visacard from '../../public/Visa-card-dark.png';

class Footer extends React.Component {
	
	render () {
		return (
			<footer className="footer">
				<div className="footer-background-opacity">
					<div className="footer-main-container">
						<div className="footer-second-container">
							<img src={imgRentCar} className="footer-img-photo" alt="footer-img"/>
							<div className="footer-links-container">
								<ul className="footer-links-list">
									<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>For Us</NavLink></li>
									<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Subscribe</NavLink></li>
									<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Support</NavLink></li>
									<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Contacts</NavLink></li>
								</ul>
							</div>
							<div className="footer-icons-container">
								<img src={mastercard} className="footer-icons-logo" alt="card-logo"/>
								<img src={visacard} className="footer-icons-logo" alt="card-logo"/>
								<img src={bitcoin} className="footer-icons-logo" alt="card-logo"/>
								<img src={paypal} className="footer-icons-logo" alt="card-logo"/>
							</div>
						</div>

						<div className="footer-second-container">
						<div className="footer-partners-icons-container">
								<div className="footer-partners-icons-title">Follow us:</div>
								<FontAwesomeIcon icon={faFacebook} className="footer-partners-icon footer-partners-icon-facebook"/>
								<FontAwesomeIcon icon={faInstagram} className="footer-partners-icon footer-partners-icon-instagram"/>
								<FontAwesomeIcon icon={faTwitter} className="footer-partners-icon footer-partners-icon-twitter"/>
								<FontAwesomeIcon icon={faYoutube} className="footer-partners-icon footer-partners-icon-youtube"/>
							</div>
							<ul className="footer-project-list">
								<li className="footer-project-item footer-project-item-title">PROJECT</li>
								<li className="footer-project-item">
									<NavLink className="footer-project-link footer-project-link-github" to="#" replace>Github</NavLink>
									<FontAwesomeIcon icon={faGithub} className="footer-project-hover-icon-github"/>
								</li>
								<li className="footer-project-item">
									<NavLink className="footer-project-link footer-project-link-mongodb" to="#" replace>Mongo DB</NavLink>
									<FontAwesomeIcon icon="database" className="footer-project-hover-icon-mongodb"/>
								</li>
								<li className="footer-project-item">
									<NavLink className="footer-project-link footer-project-link-firebase" to="#" replace>FireBase</NavLink>
									<FontAwesomeIcon icon="rocket" className="footer-project-hover-icon-firebase"/>
								</li>
								<li className="footer-project-item">
									<NavLink className="footer-project-link footer-project-link-cloudinary" to="#" replace>Cloudinary</NavLink>
									<FontAwesomeIcon icon="cloud-upload-alt" className="footer-project-hover-icon-cloudinary"/>
								</li>
							</ul>
							<div className="footer-privacy-policy">
								&nbsp;&nbsp;&nbsp;&nbsp;This Privacy and Data Protection Policy in relation to the processing and security of personal data determines the position and intentions of GetRentaCar. In the field of processing and ensuring the security of personal data in order to respect and protect the rights and freedoms of each person and, in particular, the right to privacy.
							</div>						
						</div>	
					</div>
					
					<div className="footer-content">&copy; copyright 2021 All Rights Reserved</div>
				</div>
			</footer>
		);
	}
}

export default Footer;