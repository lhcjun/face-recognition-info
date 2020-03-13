import React, { Component } from "react";
import Particles from "react-particles-js";
import particlesOptions from '../Assets/particles.json';
import Navigation from "../Components/Navigation/Navigation";

import "./App.css";


class App extends Component {
  render() {
    return (
      <div>
        <Particles params={particlesOptions} className="particles" />
        <Navigation />
      </div>
      /*
      <Count/>
      <ImageLink/>
      <FaceRecognition/>
      */
    );
  }
}

export default App;
