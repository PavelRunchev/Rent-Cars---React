import React from 'react';
import AuthContext from '../../services/authContext';
import { Redirect, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import myToastr from '../../utilities/toastr';
import RequestPost from '../../utilities/RequestPost';
import cookie from 'react-cookies';
import Error from  '../../utilities/error';
import Post from './Post';
import RemoveMessage from './RemoveMessage';

class Posts extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			posts: null,
			description: '',
			isRemoveMessageShow: false,
			removePostId: null,
			redirect: null
		}

		this.changeHandler = this.changeHandler.bind(this);
		this.createPost = this.createPost.bind(this);
		this.showPostsContainer = this.showPostsContainer.bind(this);
		this.hidePostsContainer = this.hidePostsContainer.bind(this);
		this.removePost = this.removePost.bind(this);
	}

	async componentDidMount() {
		await this.isMountedTrue();
		await this.getAllPost();
	}

	componentDidUpdate(prevProps,prevState) {
		
	}

	async componentWillUnmount() {
		this._isMounted = false;
	}

	isMountedTrue() {
		this._isMounted = true;
	}

	async getAllPost() {
		if(this._isMounted) {
			const data = await RequestPost.allPosts();
			if(this._isMounted && data.status === 200)
				await this.setState({ posts: data.data });
		}
	}

	changeHandler(e) {
		if(this._isMounted) this.setState({ description: e.target.value });
	}

	async createPost(e) {
		e.preventDefault();

		try {
			if(this.state.description === '')
				return myToastr.info('Cannot send empty post!');
			if(this.state.description.length < 2)	
				return myToastr.info(`Description don't must be less 2 symbols!`);

			const token = await cookie.load('token');
			let firstName; let imageUrl;
			if(token) {
				firstName = this.context.user.firstName;
				imageUrl = this.context.user.profileImageUrl;
			} else {
				firstName = null;
				imageUrl = null;
			}

			const newPost = {
				description: this.state.description, 
				firstName, 
				imageUrl
			};

			const res = await RequestPost.createPost(newPost, token);
			if(!res)
				return console.log(res);

			//todo return created post from api server!!!!
			if(this._isMounted) {
				let newArr = [...this.state.posts];
				newArr.unshift(res.data.post);
				this.setState({ posts: newArr });
				myToastr.success(`${res.data.message}`);
			}
				
			document.querySelector('.post-textarea').value = '';
		} catch(err) {
			Error(err);
		}
	}

	showPostsContainer(e) {
		e.preventDefault();
		this.postsContainerMove('scale(0) translate(-400px, 0px)', '0', 'translate(410px, 0px)', '1');
	}

	hidePostsContainer(e) {
		e.preventDefault();
		this.postsContainerMove('scale(1) translate(0px, 0px)', '1', 'translate(-410px, 0px)', '0');
	}

	postsContainerMove(btnTranslate, btnOpacity, containerTranslate, containerOpacity) {
		let btn = document.querySelector('.post-comments-btn-container');
		let container = document.querySelector('.post-container');
		btn.style["transition"] = 'all 1s';
		btn.style["opacity"] = `${btnOpacity}`;
		btn.style["transform"] = `${btnTranslate}`;
		
		container.style["transition"] = 'all 1.5s';
		container.style["opacity"] = `${containerOpacity}`;
		container.style["transform"] = `${containerTranslate}`;
	}

	removeMessageIsShow = async (e, _id) => {
		e.preventDefault();
		//Show animation for remove message from sscs animation!
		//Posible is here!
		await this.setState({ isRemoveMessageShow: true, removePostId: _id });
	}

	removeMessageIsHide = async (e) => {
		e.preventDefault();
		await this.removeMessageHideAnimation();
	}

	removeMessageHideAnimation() {
		//Hide animation for hide remove message!
		let rm = document.querySelector('.remove-message-container');
		rm.animate([{ opacity: '1' }, { opacity: '0', display: 'none' }], 
				{
					duration: 400,
					easeing: "ease-out",
					delay: 0,
					fill: "forwards",
				});
		setTimeout(async () => {
			if(this._isMounted) {
				await this.setState({ isRemoveMessageShow: false });
			}
		}, 400);	
	}

	async removePost(e) {
		e.preventDefault();
		const { removePostId } = this.state;
		//todo!!!
		// delete post fetch and filter posts array
		if(this._isMounted) {
			try {
				const adminToken = await cookie.load('a-%l@z_98q1&');
				if(!adminToken) {
					this.removeMessageHideAnimation();
					this.postsContainerMove('scale(1) translate(0px, 0px)', '1', 'translate(-410px, 0px)', '0');
					myToastr.error('Log in your account!');
					return this.props.history.push('/sign-in');
				}

				const res = await RequestPost.removePost(removePostId, adminToken);
				if(res.status === 200 && this._isMounted) {
					const filtredPosts = await [...this.state.posts].filter(p => p._id !== removePostId);
					await this.setState({ posts: filtredPosts });
					myToastr.info(res.data.message);
					this.removeMessageHideAnimation();
				} 
			} catch(err) {
				if(err.response !== undefined) {
					this.removeMessageHideAnimation();
					myToastr.error(`${err.response.data.message}`);
				} else {
					const isSetState = Error(err);
					if(isSetState)
						this.setState({ redirect: '/error/internal-server-error' });
				}
			};
		}
	}

	render () {
		const { posts, isRemoveMessageShow } = this.state;

		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		return (
			<>
				<div>
					<div className="post-container">
						<div className="post-title-container">
							<h3 className="post-title">Live Posts</h3>
							<FontAwesomeIcon icon="arrow-alt-circle-left" className="post-comments-back" onClick={this.hidePostsContainer}/>
						</div>
						
						<hr/>
						<div className="post-container-posts">
							{posts !== null ? posts.map((p, i) => {
								p.index = i + 1;
								return <Post key={i} data={p} isShowRemove={this.removeMessageIsShow}/>
							}) : <p className="post-no-posts">No posts!</p>}
						</div>

						<hr/>
						<form>
							<textarea onChange={this.changeHandler} className="post-textarea" name="description" placeholder="description">
							</textarea>
							<button className="post-btn-sesnd" onClick={(e) => this.createPost(e)}>Send</button>
						</form>
					</div>
					<div className="post-comments-btn-container">
						<FontAwesomeIcon icon="comment-alt" onClick={this.showPostsContainer} className="post-comments-show-btn"/>
					</div>
				</div>
				{isRemoveMessageShow 
					? <RemoveMessage 
							isRemoveMessageHide={this.removeMessageIsHide} 
							removeItem={this.removePost}
							title={'Post'}
							content={'post'}
						/>
					: null
				}
			</>
		)
	}
}

Posts.contextType = AuthContext;

export default withRouter(Posts);