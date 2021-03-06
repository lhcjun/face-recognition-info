import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particlesOptions from '../Assets/particles.json';

import Navigation from '../Components/Navigation/Navigation';
import ImageLink from '../Components/ImageLink/ImageLink';
import Count from '../Components/Count/Count';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import ResultBox from '../Components/ResultBox/ResultBox';
import SignIn from '../Components/SignIn/SignIn';
import Register from '../Components/Register/Register';
import Modal from '../Components/Modal/Modal';
import Profile from '../Components/Profile/Profile';
import { calculateFaceFrame } from './Handler/calculateFaceFrame';
import { addFaceInfo } from './Handler/addFaceInfo';
import { API_CALL } from '../Assets/apiCall';
import './App.css';


const initialState = {
  inputLink: '',
  imageUrl: '',
  faceFrame: [],
  allInfo: [],
  index: 0,
  infoVisible: false,
  detectError: false,
  faceAmount: 0,
  inputMethod: 'search',
  methodText: 'local',
  isProfileOpen: false,
  route: 'signIn', // signIn
  isSignedIn: false,  // false
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount(){
    // check if there's JWT token in session storage 
    const token = window.sessionStorage.getItem('token'); // key
    if(token){
      fetch(API_CALL.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token        // 'Bearer' + token
        } // set JWT token to auth header on client side
      })
        .then(res => res.json())
        .then(data => {
          if(data && data.id){  // getAuthTokenId > { id: reply }
            // get user profile from postgres with user id
            fetch(API_CALL.PROFILE_ID + `${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(res => res.json())
              .then(user => {
                if(user && user.email){
                  this.loadUser(user);
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log)
    }
  }

  loadUser = data => {
    // when sign in or register > load user info > use id (server) to add entries (state)
    // when user updating data > Profile call loadUser to set user state
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }})
  }

  getFaceInfo = data => {
    // if no token in session > won't get into /image & /imageUrl
    if(data && data.outputs){
      // To get info of all faces in an image
      const allFacesInfo = data.outputs[0].data.regions;
      // To get the highest percentage of age, gender, cultural
      const ages = allFacesInfo.map(face => face.data.concepts[0]);
      const genders = allFacesInfo.map(face => face.data.concepts[20]);
      const culturals = allFacesInfo.map(face => face.data.concepts[22]);
      // count faces
      const faceAmount = data.outputs[0].data.regions.length;
      // set state faceFrame and allInfo with handlers
      this.setState({
        faceFrame: calculateFaceFrame(allFacesInfo),
        allInfo: addFaceInfo(ages, genders, culturals),
        faceAmount: faceAmount
      });
    };
    return;
  }

  onInputChange = event => {
    if(this.state.inputMethod === 'file'){
      if(event.target.files[0]){
        // read input file
          let inputFile = event.target.files[0];
          let fileReader = new FileReader();
          fileReader.readAsDataURL(inputFile);
          fileReader.onload = e => this.setState({ inputLink: e.target.result })
        }}else{
          this.setState({ inputLink: event.target.value });  
        }
  };

  onInputMethodChange = () => {
    this.state.inputMethod === 'search'
    ? this.setState({inputMethod: 'file', methodText: 'url'})
    : this.setState({inputMethod: 'search', methodText: 'local'})
  };

  onPictureSubmit = () => {
    const { inputLink, inputMethod } = this.state;
    this.setState({ imageUrl: inputLink, infoVisible: false });
    //  /imageUrl => Clarifai API call & handleInputFile (Data URI)
    // Data URI: data:image/jpeg;base64,<data>
    fetch(API_CALL.IMAGE_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        inputLink: inputLink,
        inputMethod: inputMethod
      })
    })
      .then(res => res.json())
      .then(res => {
        //  /image => count images detected > add entries (state)  
        if(res){
          fetch(API_CALL.IMAGE, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.getFaceInfo(res);
        this.setState({detectError:false});
      })
      .catch(err => console.log(err), this.setState({ detectError: true, faceFrame: [] }))
  };

  onMouseHovering = person => {
    this.setState({ index: person, infoVisible: true })
  };

  removeSessionToken = () => {
    window.sessionStorage.removeItem('token')
  }

  onRouteChange = route => {
    if(route === 'signOut'){
      this.removeSessionToken();
      this.setState(initialState);
    }else if (route === 'home'){
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  };

  render() {
    const { imageUrl, faceFrame, allInfo, index, infoVisible, detectError, methodText, inputMethod, route, isSignedIn, faceAmount, isProfileOpen, user } = this.state;
    let displayPersonInfo = allInfo[index];

    return (
      <React.Fragment>
        <Particles params={particlesOptions} className='particles' />
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn} 
          toggleModal={this.toggleModal}
        />
        {route === 'home'
          ? <React.Fragment>
              <Count name={this.state.user.name} entries={this.state.user.entries} />
              { isProfileOpen &&      // isProfileOpen ? <Modal> : null
                <Modal>
                  <Profile 
                    toggleModal={this.toggleModal} 
                    user={user} 
                    loadUser={this.loadUser} 
                  />
                </Modal>
              }
              <div className='flex flex-wrap center'>
                <ResultBox
                    displayPersonInfo={displayPersonInfo} 
                    faceFrame={faceFrame} 
                    infoVisible={infoVisible}
                    detectError={detectError}
                    imageUrl={imageUrl}
                    inputMethod={inputMethod}
                    faceAmount={faceAmount}
                  />        
                <div className='mr4'>
                  <ImageLink
                    onInputChange={this.onInputChange}
                    onPictureSubmit={this.onPictureSubmit}
                    onInputMethodChange={this.onInputMethodChange}
                    methodText={methodText}
                    inputMethod={inputMethod}
                  />
                  <FaceRecognition
                    imageUrl={imageUrl}
                    faceFrame={faceFrame} 
                    onMouseHovering={this.onMouseHovering}
                  /> 
                </div>
              </div>
            </React.Fragment>
          : ( route === 'signIn' || route === 'signOut'
              ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            ) 
        }
      </React.Fragment>
    );
  }
}

export default App;
