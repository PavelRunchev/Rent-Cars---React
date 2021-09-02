import React, {Suspense, lazy } from 'react';
import AuthContext from './services/authContext';
import { HashRouter, Route, Switch } from 'react-router-dom';
import myToastr from './utilities/toastr';
import cookie from 'react-cookies';
import auth from  './utilities/auth';
import Error from './utilities/error';
import RequestUser from './utilities/RequestUser';


//import global sass file (App.scss)! No needed import in every component!
import './App.scss';

//Components
import Navigation from './components/navigation/Navigation';
import Cars from './components/Cars';
import Footer from './components/footer/Footer';
import PotentialError from './components/PotentialError';
import Loading from './components/Loading/Loading';
import PageNotFound from './components/PageNotFound';
import Posts from './components/User/Posts';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faExclamationCircle, faExclamationTriangle, faUser, 
  faUserTie, faEnvelope, faLock, faMapMarkerAlt, faMobileAlt, faHeart, faCaretDown, 
  faTimes, faShare, faEye, faComments, faArrowAltCircleLeft, faCommentAlt, faEnvelopeSquare, faTrashAlt, faEyeSlash, faCog } from "@fortawesome/free-solid-svg-icons";
library.add( faTrash, faCheck, faExclamationCircle, faExclamationTriangle, 
  faUser, faUserTie, faEnvelope, faLock, faMapMarkerAlt, faMobileAlt, faHeart, faCaretDown, 
  faTimes, faShare, faEye, faComments, faArrowAltCircleLeft, faCommentAlt, faEnvelopeSquare, 
  faTrashAlt, faEyeSlash, faEye, faCog, faExclamationTriangle);

const About = lazy(() => import('./components/About'));
const Contacts = lazy(() => import('./components/Contacts'));
const Gallery = lazy(() => import('./components/Gallery'));
const MyRoom = lazy(() => import('./components/User/MyRoom'));
const SignIn = lazy(() => import('./components/User/SignIn'));
const SignUp = lazy(() => import('./components/User/SignUp'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      profileImageUrl: null,
      isRemoveMessage: false
    }

    this.openWidget = this.openWidget.bind(this);
    this.saveUserDataInGlobalState = this.saveUserDataInGlobalState.bind(this);
  }

  saveUserDataInGlobalState(u) {
    //after signin requiest in Navigation from requestForUserData method!!!
    this.setState({ user: u });
  }

  async openWidget(ev) {
    //todo !!!
		const { user } = this.state;
		const token = await cookie.load('token');
		if(!token) return myToastr.error('Login your an account!');

		if(auth.isLogged() && user) {
			const widget = window.cloudinary.createUploadWidget({
			cloudName: `${user.profileName}`,
      api_secret: 'IZr3aiB7b_6JQ4nAMrRxBcuT9Bw',
			uploadPreset: "profile1",
      folder: "userRepository",
      tags: ['userRepository']
			}, (error, result) => {
				if(result.event === 'success') {
					this.setState({ profileImageUrl: result.info.url });

					//request to base save profile image.
					const data = {
						public_key: result.info.public_id,
						userId: user._id,
            profileImageUrl: result.info.url
					};

					RequestUser
					.updateProfileImage(data, token)
					.then((res) => {
            console.log(res)
						myToastr.info(res.data);
					}).catch(err => Error(err));
				}
			});

			widget.open();
		} else {
			myToastr.error('You have need account!');
		}
	}

  render () {
    const data = { 
      user: this.state.user, 
      profileImageUrl: this.state.profileImageUrl 
    };

    return (
      <div className="App">
        <PotentialError>
          <HashRouter>
              <AuthContext.Provider value={data}>
                <Navigation getData={this.saveUserDataInGlobalState}/>
                <main>
                  <div className="main-container">
                    <Posts isShowRemove={this.removeMessageShow}/>
                    <Suspense fallback={<Loading/>}>
                          <Switch>
                            <Route exact path="/" component={() => <Cars/>}/>
                            <Route exact path="/home" component={() => <Cars/>}/>
                            <Route exact path="/about" component={() => <About/>} />
                            <Route exact path="/contacts" component={Contacts}/>
                            <Route exact path="/gallery" component={() => auth.isLogged() ? <Gallery/> : <SignIn/>}/>
                            <Route exact path="/my-room" component={() => auth.isLogged() ? <MyRoom widget={this.openWidget}/> : <SignIn/>}/>
                            <Route exact path="/sign-in" component={() => <SignIn/>}/>
                            <Route exact path="/sign-up" component={() => <SignUp/>}/>
                            <Route exact path="/error/internal-server-error" component={PotentialError}/>

                            <Route path="*" component={PageNotFound}/>
                          </Switch>
                    </Suspense>
                  </div>
                </main>
              </AuthContext.Provider>
            <Footer />
          </HashRouter>
        </PotentialError>
      </div>
    );
  }
}

export default App;
