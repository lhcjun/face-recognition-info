import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => (
    <div className='profile-modal'>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white'>
            <main className='pa4 black-80 w-80'>
                <img 
                    src='http://tachyons.io/img/logo.jpg' 
                    className='br3 pa1 ba b--black-10 h3 w3' 
                    alt='avatar'
                />
                <h1>Harry</h1>
                <h4>Image Submitted: 5</h4>
                <p>Member Since: 2020</p>
                <hr />
                {/* Name */}
                <label className='mt2 fw6' htmlFor='user-name'>Name</label>
                <input 
                    className='pa2 input-reset ba w-100' placeholder='Harry' 
                    type='text' name='user-name'  id='user-name'
                />
                {/* Age */}
                <label className='mt2 fw6' htmlFor='user-age'>Age</label>
                <input 
                    className='pa2 input-reset ba w-100' placeholder='11' 
                    type='text' name='user-age'  id='user-age'
                />
                {/* Pet */}
                <label className='mt2 fw6' htmlFor='user-pet'>Pet</label>
                <input 
                    className='pa2 input-reset ba w-100' placeholder='Owl' 
                    type='text' name='user-pet'  id='user-pet'
                />
                {/* Submit */}
                <div className='center mt4 flex' style={{ justifyContent: 'space-evenly' }}>
                  <button
                    className='b ph3 pv2 input-reset ba b--black grow pointer f6 dib center mt2 br3 formFont save-hover'
                  >Save</button>
                  <button
                    className='b ph3 pv2 input-reset ba b--black grow pointer f6 dib center mt2 br3 formFont cancel-hover'
                    onClick={toggleModal}
                  >Cancel</button>
                </div>
            </main>
            {/* Close button */}
            <div className='modal-close' onClick={toggleModal}>&times;</div>
          </article>
    </div>
);

export default Profile;