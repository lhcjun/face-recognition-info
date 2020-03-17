import React, { Component } from "react";
import Particles from "react-particles-js";
import particlesOptions from "../Assets/particles.json";
import Clarifai from "clarifai";

import Navigation from "../Components/Navigation/Navigation";
import ImageLink from "../Components/ImageLink/ImageLink";
import Count from "../Components/Count/Count";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";
import ResultBox from "../Components/ResultBox/ResultBox";
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
  infoVisible: false
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
    this.setState({ inputLink: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.inputLink, infoVisible: false });
    app.models
      .predict(
        Clarifai.DEMOGRAPHICS_MODEL,
        this.state.inputLink
      )
      .then(res => this.getFaceInfo(res))
      .catch(err => console.log(err))
  };

  onMouseHovering = person => {
    this.setState({index: person, infoVisible: true })
  };

  render() {
    const { imageUrl, faceFrame, allInfo, index, infoVisible } = this.state;
    let displayPersonInfo = allInfo[index];
    return (
      <React.Fragment>
        <Particles params={particlesOptions} className="particles" />
        <Navigation />
        <Count />
        <div className='flex flex-wrap'>
          <div className='mr4'>
            <ImageLink
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition 
              imageUrl={imageUrl}
              faceFrame={faceFrame} 
              onMouseHovering={this.onMouseHovering}
            />
          </div>    
          <ResultBox 
            displayPersonInfo={displayPersonInfo} 
            faceFrame={faceFrame} 
            infoVisible={infoVisible}
          /> 
        </div>
      </React.Fragment>
    );
  }
}

export default App;
