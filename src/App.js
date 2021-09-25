import React, { lazy, Suspense } from 'react';
import cookie from 'react-cookies';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import global sass file (App.scss)! No needed import in every component!
import './App.scss';
import Cars from './components/Cars';
import Footer from './components/footer/Footer';
import Loading from './components/Loading/Loading';
//Components
import Navigation from './components/navigation/Navigation';
import Title from './components/Title/Title';
import PageNotFound from './components/PageNotFound';
import PotentialError from './components/PotentialError';
import NetworkError from './components/NetworkError';
import Posts from './components/User/Posts';
import AuthContext from './services/authContext';
import auth from './utilities/auth';
import Error from './utilities/error';
import RequestUser from './utilities/RequestUser';
import myToastr from './utilities/toastr';

import navScrollEffect from './services/navbarScrollEffect';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAngleUp,
  faArrowAltCircleLeft, faBars, faCaretDown, faCaretRight, faCaretUp, faCheck, faCloudUploadAlt, faCog, faCommentAlt,
  faComments, faDatabase, faEnvelope, faEnvelopeSquare, faExclamationCircle,
  faExclamationTriangle, faEye, faEyeSlash, faHeart, faLock, faMapMarkerAlt,
  faMobileAlt, faPortrait, faRocket, faShare, faSignOutAlt, faTh, faTimes, faTrash, faTrashAlt, faUser, faUserCheck, faUserTie
} from "@fortawesome/free-solid-svg-icons";


library.add( faTrash, faCheck, faExclamationCircle, faExclamationTriangle, 
  faUser, faUserTie, faEnvelope, faLock, faMapMarkerAlt, faMobileAlt, faHeart, faCaretDown, 
  faTimes, faShare, faEye, faComments, faArrowAltCircleLeft, faCommentAlt, faEnvelopeSquare, 
  faTrashAlt, faEyeSlash, faEye, faCog, faExclamationTriangle, faCcPaypal, faDatabase, 
  faCloudUploadAlt, faRocket, faAngleDown, faAngleUp, faCaretRight, faCaretUp, faSignOutAlt, 
  faPortrait, faTh, faUserCheck, faBars);

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
      isRemoveMessage: false,
      networkError: false
    }

    this.openWidget = this.openWidget.bind(this);
    this.saveUserDataInGlobalState = this.saveUserDataInGlobalState.bind(this);
    this.errorIsNetwotk = this.errorIsNetwotk.bind(this);
  }

  componentDidMount() {
      navScrollEffect();
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

  async errorIsNetwotk(err) {
    if(err) await this.setState({ networkError: true });
  }

  render () {
    const { networkError } = this.state;
    const data = { 
      user: this.state.user, 
      profileImageUrl: this.state.profileImageUrl 
    };

    return (
      <div className="app" onScroll={this.onScrollingNav}>
       
        <PotentialError networkError={this.errorIsNetwotk}>
          <HashRouter>
              <AuthContext.Provider value={data}>
                <Navigation getData={this.saveUserDataInGlobalState} errorIsNetwotk={this.errorIsNetwotk}/>
                {networkError ? <NetworkError/> : 
                  <>
                    
                    <Title />
                    <main>
                      <div className="main-container">
                        <Posts isShowRemove={this.removeMessageShow} errorIsNetwotk={this.errorIsNetwotk}/>
                        
                        <Suspense fallback={<Loading/>}>
                              <Switch>
                                  <Route exact path="/" component={() => <Cars errorIsNetwotk={this.errorIsNetwotk}/>}/>
                                  <Route exact path="/home" component={() => <Cars errorIsNetwotk={this.errorIsNetwotk}/>}/>
                                  <Route exact path="/about" component={() => <About/>} />
                                  <Route exact path="/contacts" component={Contacts}/>
                                  <Route exact path="/gallery" component={() => auth.isLogged() ? <Gallery errorIsNetwotk={this.errorIsNetwotk}/> : <SignIn/>}/>
                                  <Route exact path="/my-room" component={() => auth.isLogged() ? <MyRoom widget={this.openWidget} errorIsNetwotk={this.errorIsNetwotk}/> : <SignIn/>}/>
                                  <Route exact path="/sign-in" component={() => <SignIn/>}/>
                                  <Route exact path="/sign-up" component={() => <SignUp/>}/>
                                  <Route exact path="/error/internal-server-error" component={PotentialError}/>

                                  {<Route path="*" component={PageNotFound}/>}
                                }
                              </Switch>
                        </Suspense>
                      </div>
                    </main>
                    <Footer />
                  </>}

              </AuthContext.Provider>
          </HashRouter>
        </PotentialError>
      </div>
    );
  }
}

export default App;
