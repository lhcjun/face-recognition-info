import React, { Component } from 'react';
import { API_CALL } from '../../Assets/apiCall';
import './SignIn.css';

class SignIn extends Component{
    constructor(props){
      super(props);
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }
    onEmailChange = event => {
      this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = event => {
      this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = event => {
      event.preventDefault();
      fetch(API_CALL.SIGNIN,{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then(res => res.json())
      .then(user => this.onSignInValidate(user.id, user))
      .catch(console.log)
    }

    onSignInValidate = (id, user) => {
      const loginError = document.querySelector('#loginError');
      if(id){ // user.id
          // when sign in or register > load user info
          this.props.loadUser(user);
          this.props.onRouteChange('home');
      }else{
        loginError.style.display = 'flex';
      }
      
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
            <main className='pa4 black-80'>
              <form className='measure'>
                <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                  <legend className='fw6 ph0 mh0 center signTitle'>Sign In</legend>
                  {/* Input field - email */}
                    <div className='mt3'>
                      <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
                      <input 
                        className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 focus-black' 
                        type='email' name='email-address'  id='email-address'
                        onChange = {this.onEmailChange}
                      />
                    </div>
                    {/* Input field - password */}
                    <div className='mv3'>
                      <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
                      <input 
                        className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 focus-black' 
                        type='password' name='password'  id='password' autoComplete='off'
                        onChange = {this.onPasswordChange}
                      />
                    </div>
                </fieldset>
                {/* Error login */}
                <label id='loginError' className='center'>Incorrect email or password</label>
                {/* Submit */}
                <div className='center'>
                  <input
                    onClick = {this.onSubmitSignIn}
                    className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center mt2 br3 formFont' 
                    type='submit' 
                    value='Sign in'
                  />
                </div>
                <div className='lh-copy mt3 center'>
                  <p onClick = {() => onRouteChange('register')} 
                    className='f6 link dim black db pointer formFont'>Register !</p>
                </div>
              </form>
            </main>
          </article>
        );
    }
}

export default SignIn;