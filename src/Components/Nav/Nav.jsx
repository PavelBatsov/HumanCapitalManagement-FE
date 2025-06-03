import { NavLink } from 'react-router';
import './Nav.css'

const Nav = (props) => { 
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className='nav-link' to="/">Home</NavLink >
        </li>
        {
          props.currentUserData == undefined ?
            <li className="nav-item">
              <NavLink className='nav-link' to="/login">Login</NavLink >
            </li> : null
        }
        {
          props.currentUserData == undefined ?
            <li className="nav-item">
              <NavLink className='nav-link' to="/registration">Registration</NavLink >
            </li> : null
        }
        {
          props.currentUserData != undefined ?
            <li className="nav-item">
              <NavLink className='nav-link' to="/manager">Manager</NavLink >
            </li> : null
        }
        {
          props.currentUserData != undefined ?
            <li className="nav-item">
              <NavLink className='nav-link' to="/employee">Employee</NavLink >
            </li> : null
        }
      </ul>
    </div>
    {
      props.currentUserData != undefined ?
        <div className="navbar-nav">
          <button className="nav-item nav-link active" onClick={() => props.onLogout()}>Logout</button>
        </div> : null
    }
</nav>
}

export default Nav;