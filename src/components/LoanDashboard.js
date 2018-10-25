
import React, { Component } from 'react'

export default class LoanDashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      loan:null,
      currentLoan:null,
      month:null,
      pay:null,
      paySum:null,
    }
    
  }

  componentDidMount(){
    fetch('/weekly', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user:this.props.user
      })
    })
    .then(res => res.json())
    .then(res =>{
      res=JSON.parse(res)
      let newstate= this.state
      newstate.loan=res.loan
      newstate.month=res.month
      console.log('current',res)
      newstate.currentLoan=res.loan
      console.log(newstate)
      this.setState(newstate)
    })
    //TODO: ALERT USER
    .catch(console.error)
    // .then(console.error))

  }

  onSubmitPayment = (e) =>{
    console.log('user',this.props.user)
    let payment = (this.state.loan/(this.state.month*4));
    let newstate=this.state;
    newstate.pay=payment;
    newstate.currentLoan=this.state.currentLoan-payment;
    newstate.paySum=this.state.loan-this.state.currentLoan;
    this.setState(newstate);
    console.log('pay',this.state)
    e.preventDefault();
    fetch('/weekly', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user:this.props.user,
        ...this.state
      })
    })
    .then(res => res.json())
    .then(res =>{
      if(res){
        console.log(res)
        this.props.setUser(JSON.parse(res).newuser)
        // this.props.changeRoute('LoanDashboard')
      }
    })
  }

  render() {
    return (
      <div className="br3 ba pa4 dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw8 shadow-4 center">
        <h1>Loan DashBoard</h1>
        <p>Current Loan Information.</p>
        <hr />
        <div className='row'>
          <div className='col-sm-6'>
            <div className="card ">
              <div className="card-header font-weight-bold">
                Payment Made
              </div>
              <div className="card-body">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h5 className="card-title">SGD {this.state.paySum}</h5>
                <p className="card-text">With weekly interest: 20 SGD</p>
                
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className="card">
              <div className="card-header font-weight-bold">
                Total Balance
              </div>
              <div className="card-body">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h5 className="card-title">SGD {this.state.currentLoan}</h5>
                <p className="card-text">Loan Balance excluding the weekly interest</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className=' mt-3'>
  
          <div className="card">
            <div className="card-header font-weight-bold">
              Weekly Payment : SGD {(this.state.loan/(this.state.month*4))+20}
            </div>
            <div className="card-body">
              Please fill the credit/debit card information below to submit payment.
              <br/>
              <div className="card-row mt-3">
                <img alt='card' className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png"/>
              </div>
              <form>
                <div className="form-group">
                  <label>Name on card</label>
                  <input required id="NameOnCard" className="form-control" type="text" maxLength="255"/>
                </div>
                <div className="form-group">
                  <label>Card number</label>
                  <input required id="CreditCardNumber" className="form-control" type="text"/>
                </div>
                <div className='row'>
                  <div className="expiry-date-group form-group col-6">
                    <label>Expiry date</label>
                    <input required id="ExpiryDate" className="form-control" type="text" placeholder="MM / YY" maxLength="7"></input>
                  </div>
                  <div className="security-code-group form-group col-6">
                    <label>Security code</label>
                    <div className="input-container" >
                      <input required id="SecurityCode" className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>ZIP/Postal code</label>
                  <div className="input-container">
                    <input required id="ZIPCode" className="form-control" type="text" maxLength="10"/>
                  </div>
                </div>
                <button onClick={this.onSubmitPayment} id="PayButton" className="btn btn-block btn-success submit-button" type="submit">
                  <span className="align-middle">Submit Payment</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

