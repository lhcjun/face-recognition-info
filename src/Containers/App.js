import React, { Component } from "react";
import Particles from "react-particles-js";
import particlesOptions from "../Assets/particles.json";
import Clarifai from "clarifai";

import Navigation from "../Components/Navigation/Navigation";
import ImageLink from "../Components/ImageLink/ImageLink";
import Count from "../Components/Count/Count";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";
import ResultBox from "../Components/ResultBox/ResultBox";
import SignIn from "../Components/SignIn/SignIn";
import Register from "../Components/Register/Register";
import { calculateFaceFrame } from './Handler/calculateFaceFrame';
import { addFaceInfo } from './Handler/addFaceInfo';
import "./App.css";

const app = new Clarifai.App({
  apiKey: "a3da059c0de242bab6f0d73659a1ba17"
});

const initialState = {
  inputLink: '',
  imageUrl: '',
  faceFrame: [],
  allInfo: [],
  index: 0,
  infoVisible: false,
  detectError: false,
  inputMethod: 'search',
  methodText: 'local',
  route: 'signIn',
  isSignedIn: false
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  getFaceInfo = data => {
    const faceInfo = data.outputs[0].data.regions;
    // To get all faces in an image
    const allFaces = faceInfo.map(face => face);
    // To get highest percentage of age, gender, cultural
    const age = faceInfo.map(age => age.data.face.age_appearance.concepts[0]);
    const gender = faceInfo.map(gender => gender.data.face.gender_appearance.concepts[0]);
    const cultural = faceInfo.map(cultural => cultural.data.face.multicultural_appearance.concepts[0]);
    // set state faceFrame and allInfo with handlers
    this.setState({
      faceFrame: calculateFaceFrame(allFaces),
      allInfo: addFaceInfo(age, gender, cultural)
    });
  }

  onInputChange = event => {
    if(this.state.inputMethod === 'file'){
      if(event.target.files[0]){
        // read input file
          let inputFile = event.target.files[0];
          let fileReader = new FileReader();
          fileReader.readAsDataURL(inputFile);
          fileReader.onload = e => this.setState({inputLink: e.target.result})
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
    this.setState({ imageUrl: this.state.inputLink, infoVisible: false });
    // Data URI: data:image/jpeg;base64,<data>    <data> start from 23 (begin 0)
    let handleInputFile = this.state.inputLink.split('').slice(23).join('');
    app.models
      .predict(
        Clarifai.DEMOGRAPHICS_MODEL,
        this.state.inputMethod === 'search'
        ? this.state.inputLink
        : handleInputFile
      )
      .then(res => this.getFaceInfo(res), this.setState({detectError:false}))
      .catch(err => console.log(err), this.setState({detectError: true, faceFrame: []}))
  };

  onMouseHovering = person => {
    this.setState({index: person, infoVisible: true })
  };

  onRouteChange = route => {
    route === 'signOut'
    ? this.setState(initialState)
    : (route === 'home'
        ? this.setState({isSignedIn: true})
        : this.setState({route: route})
      )
  };

  render() {
    const { imageUrl, faceFrame, allInfo, index, infoVisible, detectError, methodText, inputMethod, route, isSignedIn } = this.state;
    let displayPersonInfo = allInfo[index];

    return (
      <React.Fragment>
        <Particles params={particlesOptions} className="particles" />
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn} 
        />
        {route === 'home'
          ? <React.Fragment>
              <Count />
              <div className='flex flex-wrap center'>
                <ResultBox
                    displayPersonInfo={displayPersonInfo} 
                    faceFrame={faceFrame} 
                    infoVisible={infoVisible}
                    detectError={detectError}
                    imageUrl={imageUrl}
                    inputMethod={inputMethod}
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
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            ) 
        }
      </React.Fragment>
    );
  }
}

export default App;
