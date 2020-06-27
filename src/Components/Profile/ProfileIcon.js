import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './ProfileIcon.css';


const ProfileIcon = ({ onRouteChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return(
      <div className='pa3 tc'>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            tag='span'
            data-toggle='dropdown'
            aria-expanded={dropdownOpen}
          >
            <img 
                src='http://tachyons.io/img/logo.jpg' 
                className='br-100 pa1 ba b--black-10 h3 w3 pointer' 
                alt='avatar'
            />
          </DropdownToggle>
          <DropdownMenu
            right
            className='b--transparent shadow-5 dropdown-margin'
          >
            <DropdownItem className='pv2'>View Profile</DropdownItem>
            <DropdownItem onClick={() => onRouteChange('signOut')} className='pv2' >Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
}

export default ProfileIcon;