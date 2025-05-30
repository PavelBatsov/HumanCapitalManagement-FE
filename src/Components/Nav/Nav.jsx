import { NavLink } from 'react-router';
import './Nav.css'

// const Nav = (props) => {
//   return <nav className='nav'>
//     <div className='nav_list'>
//       <NavLink className='nav_link' to="/">Home</NavLink >
//       {props.currentUserData == undefined ? <NavLink className='nav_link' to="/login">Login</NavLink > : null}
//       {props.currentUserData == undefined ? <NavLink className='nav_link' to="/registration">Registration</NavLink > : null}
//       {props.currentUserData != undefined ? <NavLink className='nav_link' to="/dashboard">Dashboard</NavLink > : null}
//     </div>
//   </nav>
// }

const Nav = (props) => { 
    return <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
         <NavLink className='nav-link' to="/">Home</NavLink >
      </li>
      {
        props.currentUserData == undefined ?
        <li class="nav-item">
            <NavLink className='nav-link' to="/login">Login</NavLink >
        </li> : null
      }
      {
        props.currentUserData == undefined ?
        <li class="nav-item">
            <NavLink className='nav-link' to="/registration">Registration</NavLink >
        </li> : null
      }
      { 
        props.currentUserData != undefined ?
        <li class="nav-item">
            <NavLink className='nav-link' to="/dashboard">Dashboard</NavLink >
        </li> : null
      }
    </ul>
  </div>
    {
        props.currentUserData != undefined ?
        <div class="navbar-nav">
            <button class="nav-item nav-link active" onClick={() => props.onLogout()}>Logout</button>
        </div> : null
    }
</nav>
}

export default Nav;