import React from 'react'

 const Nav=(props) =>{
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <a className="navbar-brand text-light" href='./'>ASPIRE</a>
      <div>

        <button className="btn btn-success" onClick={props.logout}>Logout</button>
      </div>
    </nav>
  )
}
export default Nav;