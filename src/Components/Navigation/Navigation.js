import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="ma0 flex">
      <Tilt
        className="br2 shadow-2 pointer tiltLogo"
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
      <nav
        className="br2 shadow-2 signBox"
      >
        <p className="link signText">Sign Out</p>
      </nav>
    </nav>
  );
};

export default Navigation;
