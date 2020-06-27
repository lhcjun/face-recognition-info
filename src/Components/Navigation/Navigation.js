import React from 'react';
import Tilt from 'react-tilt';
import ProfileIcon from '../Profile/ProfileIcon';
import { ReactComponent as Logo } from './logo.svg';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav className='ma0 flex'>
      <Tilt
        className='pointer tiltLogo'
        options={{ max: 35 }}
        style={{ height: 80, width: 220 }}
      >
        <div className='flex logo-padding'>
          <Logo style={{ paddingTop: 0, paddingRight: 15, height: 50, width: 50 }} className="app-logo" alt="logo" />
          <div className='logoText'>Face Detect</div>
        </div>
      </Tilt>
      {isSignedIn
        ? <nav className='signBox signOutBox flex'>
            <ProfileIcon onRouteChange={onRouteChange} />
          </nav>
        : <nav className='signBox flex '>
            <div className='signInBox margin'>
              <p className='link signText inText' onClick={() => onRouteChange('signIn')}>Sign In</p>
            </div>
            <div className='registerBox'>
              <p className='link signText regiText' onClick={() => onRouteChange('register')}>Register</p>
            </div>
          </nav>
      }
    </nav>
  );
};

export default Navigation;
