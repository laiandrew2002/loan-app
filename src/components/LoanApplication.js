import React, { Component } from 'react'

class LoanApplication extends Component {
  constructor(props){
    super(props);
    this.state={
      loan:0,
      month:0,
      annualIncome:0,
      purpose:'',
      firstName:'',
      lastName:'',
      dob:'',
      tel:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      country:'',
      terms:false,
      user:props.user
    }
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  onSubmitApply = (e) =>{
    e.preventDefault()
    fetch('/apply', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...this.state
      })
    })
    .then(res => res.json())
    .then(res =>{
      if(res){
        console.log(res)
        this.props.setUser(JSON.parse(res).newuser)
        this.props.changeRoute('LoanDashboard')
      }
    })
  }

  render() {
    return (
      <div className="br3 ba pa4 dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw8 shadow-4 center">
        <h1>Loan Application</h1>
        <p>Please fill in all needed information in the loan application form below to request a loan.</p>
        <hr />
        <div>
          <form>
          
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Required Loan Amount</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="loan" placeholder="SGD"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Repayment Period (Month)</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="month" placeholder="Month"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Annual Income</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="annualIncome" placeholder="SGD"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Loan Be Used For:</label>
              <div className="col-sm-10">
                <select onChange={this.onChange} value={this.state.title} className=" form-control" name='purpose'>
                  <option  hidden={true}>Click to Select</option>
                  <option value='business'>Business Loan</option>
                  <option value='personal'>Personal Loan</option>
                  <option value='business-start'>Business Start Funds</option>
                  <option value='advance-payment'>Advance Payment</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Your Name</label>
              <div className="col-sm-5">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="firstName" placeholder="First"/>
              </div>
              <div className="col-sm-5">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="lastName" placeholder="Last"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Date Of Birth</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="date" className="form-control" name="dob" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Phone Number</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="tel" className="form-control" name="tel" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="address1" placeholder='Address Line 1'/>
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control mt-3" name="address2" placeholder='Address Line 2'/>
                
                <div className=''>
                <div className="form-row mt-3">
                  <div className="col-5">
                    <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="city" placeholder="City"/>
                  </div>
                  <div className="col">
                    <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="state" placeholder="State"/>
                  </div>
                  <div className="col">
                    <input onChange={this.onChange} value={this.state.title} type="text" className="form-control" name="zip" placeholder="Zip"/>
                  </div>
                </div>
                <input onChange={this.onChange} value={this.state.title} type="text" className="form-control mt-3 col" name="country" placeholder='Country'/>
                </div>
              </div>
            </div>

            <div className="form-check form-check-inline">
              <input onChange={this.onChange} className="form-check-input" type="checkbox" name="terms" value="true"/>
              <label className="form-check-label">I agree agree that the information given is true, accurate and complete as of the date of this application submission and comply to the terms and condition of the weekly repayment</label>
            </div>
            <div className='mt-3'>
              <input onClick={this.onSubmitApply} className="btn btn-primary btn-lg btn-block" type='submit' value="Apply for Loan"/>
            </div>
          </form>
        </div>


      </div>
    )
  }
}


export default LoanApplication;