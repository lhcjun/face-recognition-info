import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav className="ma0 flex">
      <Tilt
        className="pointer tiltLogo"
        options={{ max: 35 }}
        style={{ height: 80, width: 250 }}
      >
        <div className="pa3 flex">
          <img
            src={logo}
            alt="Logo"
            style={{ paddingTop: 0, paddingRight: 15, height: 50, width: 50 }}
          />
          <div className="logoText">Face Recog</div>
        </div>
      </Tilt>
      {isSignedIn
        ? <nav className="signBox signOutBox">
            <p className="link signText outText" onClick={() => onRouteChange('signOut')}>Sign Out</p>
          </nav>
        : <nav className="signBox flex ">
            <div className="signInBox margin">
              <p className="link signText inText" onClick={() => onRouteChange('signIn')}>Sign In</p>
            </div>
            <div className="registerBox">
              <p className="link signText regiText" onClick={() => onRouteChange('register')}>Register</p>
            </div>
          </nav>
      }
    </nav>
  );
};

export default Navigation;
