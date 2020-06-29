import React, { Component } from 'react';
import { API_CALL } from '../../Assets/apiCall';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }
  };

  onFormChange = event => {
    switch(event.target.name){
      case 'user-name':
        this.setState({ name: event.target.value });
        break;
      case 'user-age':
        this.setState({ age: event.target.value });
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  }

  onProfileUpdate = updatedData => {
    fetch(API_CALL.PROFILE_ID + `${this.props.user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formInput: updatedData })
    })
      .then(res => {
        this.props.toggleModal();
        // overwrite original user state with updatedData in formInput > for loadUser to setState(user)
        this.props.loadUser({ ...this.props.user, ...updatedData }); 
      })
      .catch(console.log)
  }

  render(){
    const { isProfileOpen, toggleModal, user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className='profile-modal'>
          <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white'>
              <main className='pa4 black-80 w-80'>
                  <img 
                      src='http://tachyons.io/img/logo.jpg' 
                      className='br3 pa1 ba b--black-10 h3 w3' 
                      alt='avatar'
                  />
                  <h1>{ this.state.name }</h1>
                  <h5>{`Image Submitted: ${ user.entries }`}</h5>
                  <h6>{`Member Since: ${ new Date(user.joined).toLocaleDateString() }`}</h6>
                  <hr />
                  {/* Name */}
                  <label className='mt2 fw6' htmlFor='user-name'>Name</label>
                  <input 
                      className='pa2 input-reset ba w-100' placeholder={user.name} 
                      type='text' name='user-name'  id='user-name' onChange={this.onFormChange}  
                  />         {/* event.target.name */}         
                  {/* Age */}
                  <label className='mt2 fw6' htmlFor='user-age'>Age</label>
                  <input 
                      className='pa2 input-reset ba w-100' placeholder={user.age}
                      type='text' name='user-age'  id='user-age' onChange={this.onFormChange}
                  />
                  {/* Pet */}
                  <label className='mt2 fw6' htmlFor='user-pet'>Pet</label>
                  <input 
                      className='pa2 input-reset ba w-100' placeholder={user.pet} 
                      type='text' name='user-pet'  id='user-pet' onChange={this.onFormChange}
                  />
                  {/* Submit */}
                  <div className='center mt4 flex' style={{ justifyContent: 'space-evenly' }}>
                    <button
                      className='b ph3 pv2 input-reset ba b--black grow pointer f6 dib center mt2 br3 formFont save-hover'
                      onClick={() => this.onProfileUpdate({ name, age, pet })}
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
    )
  }
};

export default Profile;