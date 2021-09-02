import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withRemoveMessageWrapper from '../HOC/RemoveMessageWrapper';

const RemoveMessage = (props) => {
	return (
		<div className="remove-message-container">
			<div className="remove-message-card">
				<div className="remove-message-card-title">
					<p className="remove-message-card-paragraph">Delete {props.title}</p> 
					<FontAwesomeIcon icon="times" className="remove-message-card-close-btn" onClick={(e) => props.isRemoveMessageHide(e)}/>          
				</div>
				<div className="remove-message-card-content">
					<p className="remove-message-card-paragraph">Are you sure about delete {props.content}?</p>
					<FontAwesomeIcon icon="exclamation-triangle" className="remove-message-card-warning-circle"/> 
				</div>
				<div className="remove-message-card-fotter">
					<span className="remove-message-card-fotter-btn-container">
						<button className="remove-message-card-fotter-close-btn" onClick={(e) => props.isRemoveMessageHide(e)}>CLOSE</button>
						<button className="remove-message-card-fotter-delete-btn" onClick={(e) => props.removeItem(e)}>DELETE</button>
					</span>
				</div>
			</div>
		</div>
	)
}

export default withRemoveMessageWrapper(RemoveMessage);