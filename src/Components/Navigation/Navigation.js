import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";

const Navigation = () => {
  return (
    <nav className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3 dib">
          <img src={logo} alt="Logo" style={{ paddingTop: 0 }} />
          Face Recog
        </div>
      </Tilt>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p>Sign Out</p>
      </nav>
    </nav>
  );
};

export default Navigation;
