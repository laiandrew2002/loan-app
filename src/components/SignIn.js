import React, { Component } from 'react'

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      signinEmail:'',
      signinPassword:'',
    }
  }
  onEmailChange = (event) => {
    this.setState({signinEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value})
  }

onSubmitSignIn = (e) =>{
  e.preventDefault()
  fetch('/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.state.signinEmail,
      password: this.state.signinPassword,
    })
  })
  .then(res => res.json())
  .then(user =>{
    console.log(user)
    if(user.id !== null || user.id !== undefined){
      //TODO: ROUTE TO HOME PAGE
      console.log('changing route to LoanApplication')
      this.props.setUser(JSON.parse(user))
      this.props.changeRoute('LoanApplication')
    }
  })
  //TODO: ALERT USER
  .catch(err => err.text()
  .then(console.error).then(alert("Username and Password does not match!")))
}



  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="form-control" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange}  
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="form-control" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange} 
              />
            </div>
  
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <p 
              onClick={() => this.props.changeRoute('Register')} 
              className="f6 link dim black db pointer">Register</p>
            
            </div>
          </form>
      </main>
      </article>
    )
  }
}

export default SignIn;