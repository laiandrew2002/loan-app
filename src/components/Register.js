import React from 'react'

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      name: '',
      source:'',
      lookingFor:'',
      applicationForm:false
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

onSubmitSignIn = (e) =>{
  e.preventDefault()
  fetch('/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...this.state
    })
  })
  .then(res => res.json())
  .then(res =>{
    console.log(res)
    if(res){
      console.log(res)
      this.props.changeRoute('SignIn')
    }
  })
  .catch(err => err.text()
  .then(console.error))
  
    
}

  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Full Name</label>
              <input className="form-control" 
                type="text" 
                name="name"  
                id="name"
                onChange={this.onNameChange}  
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="lookingFor">Looking For</label>
              <select onChange={this.onChange} className="form-control" name='lookingFor'>
                <option  hidden={true}>Click to Select</option>
                <option value='business'>Business Loan</option>
                <option value='personal'>Personal Loan</option>
                <option value='business-start'>Business Start Funds</option>
                <option value='advance-payment'>Advance Payment</option>
              </select>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="form-control" 
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
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="source">Where did you hear about us</label>
              <select onChange={this.onChange} className="form-control" name='source'>
                <option hidden={true}>Click to Select</option>
                <option value='facebook'>Facebook</option>
                <option value='broker'>Broker</option>
                <option value='google'>Google</option>
                <option value='friends'>Friends</option>
                <option value='emails'>Emails</option>
                <option value='other'>Other</option>
              </select>
            </div>
            </fieldset>
            <div className="">
            <input 
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" value="Register"/>
            </div>
            
          </div>
        </main>
      </article>
    )
  }
}

export default Register;