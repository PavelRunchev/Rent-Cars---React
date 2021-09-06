import { faCcMastercard, faCcPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import imgRentCar from '../../public/rent-a-car-free-vector.jpg';


class Footer extends React.Component {
	
	render () {
		return (
			<footer className="footer">
				<div className="footer-img-container">
					<img src={imgRentCar} className="footer-img-photo" alt="footer-img"/>
				</div>
				<div className="footer-links-container">
					<ul className="footer-links-list">
						<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>For Us</NavLink></li>
						<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Subscribe</NavLink></li>
						<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Support</NavLink></li>
						<li className="footer-links-item"><NavLink className="footer-links-link" to="#" replace>Contacts</NavLink></li>
					</ul>
				</div>
				<div>
					<FontAwesomeIcon icon={faCcPaypal}/>
					<FontAwesomeIcon icon={faCcVisa}/>
					<FontAwesomeIcon icon={faCcMastercard}/>
				</div>
				<div className="footer-content">The power of React JS</div>
				<div className="footer-content">&copy; copyright 2021</div>
			</footer>
		);
	}
}

export default Footer;