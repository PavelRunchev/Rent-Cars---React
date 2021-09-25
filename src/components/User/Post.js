import dateConvert from '../../utilities/dateConvert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import auth from '../../utilities/auth';

class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isBan: false,
			showAdminOptions: false,
		}

		this.postIsBan = this.postIsBan.bind(this);
		this.postIsUnban = this.postIsUnban.bind(this);
		this.adminOptions = this.adminOptions.bind(this);
	}

	postIsBan(e) {
		e.preventDefault();
		this.setState({ isBan: true });
	}

	postIsUnban(e) {
		e.preventDefault();
		this.setState({ isBan: false });
	}

	async adminOptions(e) {
		const { showAdminOptions } = this.state;
		if(showAdminOptions) {
			let rm = document.querySelector('.post-user-admin-settings');
			rm.animate([{ opacity: '1' }, { opacity: '0', display: 'none' }], 
				{
					duration: 400,
					easeing: "ease-out",
					delay: 0,
					fill: "forwards",
				});
			setTimeout(async () => {
				await this.setState({ showAdminOptions: false });
			}, 400);	
		} else 
			await this.setState({ showAdminOptions: true });
	}

	render () {
		const { isBan, showAdminOptions } = this.state;
		const { content, createdDate, userFirstName, imageUrl, index, _id } = this.props.data;
		const convertTime = dateConvert(createdDate);

		return (
			<>
				<div className="post-user-container" style={{backgroundColor: index % 2 === 0 ? 'rgba(251,239,181, 0.85)' : 'none'}}>
					<div className="post-user-profile-container">
						<img src={imageUrl} className="post-image" alt="post-img"/>
						<h6 className="post-creator-email" style={{color: index % 2 === 0 ? 'rgba(69,117,182, 1)' : 'rgba(251,239,181, 1)'}}>{userFirstName}</h6>
					</div>
					<div className="post-user-content-container">
						<div className="post-user-content-title-container" style={{color: index % 2 === 0 ? 'rgba(69,117,182, 1)' : 'rgb(251,239,181)'}}>
							<h6 className="post-date" style={{color: index % 2 === 0 ? 'rgba(69,117,182, 1)' : 'rgb(251,239,181)'}}>{convertTime}</h6>
							<h6 className="post-user-index" style={{color: index % 2 === 0 ? 'rgba(69,117,182, 1)' : 'rgb(251,239,181)'}}>#{index}</h6>
							<div className="post-user-admin-settings-container">
								{auth.isAdmin() ? <FontAwesomeIcon icon="cog" className="post-user-cog-btn" onClick={this.adminOptions}/> : null}
								{showAdminOptions ? <div className="post-user-admin-settings">
									<FontAwesomeIcon icon="trash-alt" className="post-user-trash-btn" onClick={(e) => this.props.isShowRemove(e, _id)}/>
									{isBan 
										? <FontAwesomeIcon icon="eye" className="post-user-eye-btn" onClick={this.postIsUnban}/> 
										: <FontAwesomeIcon icon="eye-slash" className="post-user-eye-slash-btn" onClick={this.postIsBan}/>
									}
									<span className="post-user-eye-span">{isBan ? "banned" : "is ban!"}</span>
								</div> : null}
							</div>
						</div>
						
						{isBan ? <h5 style={{color: 'darkred', textAlign: 'center', margin: '30px 0px'}}>The post was banned!</h5> : <p className="post-content" style={{color: index % 2 === 0 ? 'black' : 'whitesmoke'}}>{content}</p>}
					</div>
				</div>

				
			</>
		)
	}
}

export default Post;