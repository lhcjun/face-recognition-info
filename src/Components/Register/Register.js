import React, { Component } from 'react';
import '../SignIn/SignIn.css';

class Register extends Component{
    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
              <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="fw6 ph0 mh0 center signTitle">Register</legend>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                      <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="name"  id="name"
                        onChange = {this.onNameChange}
                      />
                    </div>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  id="email-address"
                        onChange = {this.onEmailChange}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" name="password"  id="password" autoComplete="off"
                        onChange = {this.onPasswordChange}
                      />
                    </div>
                </fieldset>
                <div className="center">
                  <input
                    onClick = {this.onSubmitRegister}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center mt3 br3 formFont" 
                    type="submit" 
                    value="Register"/>
                </div>
              </form>
            </main>
          </article>
        );
    }
}

export default Register;