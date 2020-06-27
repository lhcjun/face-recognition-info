import React, { Component } from 'react';
import { API_CALL } from '../../Assets/apiCall';
import '../SignIn/SignIn.css';

class Register extends Component{
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        name: ''
      }
    }
    onNameChange = event => {
      this.setState({name: event.target.value})
    }
    onEmailChange = event => {
      // Regex
      const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      const formatWarning_e = document.querySelector('#formatWarning_e');
      // email format check
      if(emailRule.test(event.target.value)){
        this.setState({email: event.target.value})
        formatWarning_e.style.display='none';
      }else{
        formatWarning_e.style.display='flex';
        formatWarning_e.textContent='example@email.com';
      }
        
    }
    onPasswordChange = event => {
      const passwordValid = (event.target.value.length >= 6);
      const formatWarning_p = document.querySelector('#formatWarning_p');
      // password length check
      if(passwordValid){
        this.setState({password: event.target.value})
        formatWarning_p.style.display='none';
      }else{
        formatWarning_p.style.display='flex';
        formatWarning_p.textContent='At least 6 characters';
      }
    }

    onSubmitRegister = event => {
      event.preventDefault();
      fetch(API_CALL.REGISTER, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
      .then(res => res.json())
      .then(user => this.onRegisterValidate(user.id, user))
      .catch(console.log)
    }

    onRegisterValidate = (id, user) => {
      const loginError = document.querySelector('#loginError');
      if(id){
        this.props.loadUser(user);
        this.props.onRouteChange('home')
      }else if (user === 'Incorrect form submission'){ // from back end
        loginError.style.display='flex';
        loginError.textContent='Please fill in your details';
      }else if(user === 'Unable to register'){ // from back end
        loginError.style.display='flex';
        loginError.textContent='Email already exists';
      }
    }



    render(){
        return(
            <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
            <main className='pa4 black-80'>
              <form className='measure'>
                <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                  <legend className='fw6 ph0 mh0 center signTitle'>Register</legend>
                  {/* Input field - name */}
                  <div className='mt3'>
                      <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
                      <input 
                        className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 focus-black' 
                        type='text' name='name'  id='name'
                        onChange = {this.onNameChange}
                      />
                    </div>
                    {/* Input field - email */}
                    <div className='mt3'>
                      <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
                      <input 
                        className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 focus-black' 
                        type='email' name='email-address'  id='email-address'
                        onChange = {this.onEmailChange}
                      />
                      <label id='formatWarning_e' className='center'></label>
                    </div>
                    {/* Input field - password */}
                    <div className='mv3'>
                      <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
                      <input 
                        className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 focus-black' 
                        type='password' name='password'  id='password' autoComplete='off'
                        onChange = {this.onPasswordChange}
                      />
                      <label id='formatWarning_p' className='center'></label>
                    </div>
                </fieldset>
                {/* Error Register */}
                <label id='loginError' className='center'></label>
                {/* Submit */}
                <div className='center'>
                  <input
                    onClick = {this.onSubmitRegister}
                    className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center mt3 br3 formFont' 
                    type='submit' 
                    value='Register'/>
                </div>
              </form>
            </main>
          </article>
        );
    }
}

export default Register;