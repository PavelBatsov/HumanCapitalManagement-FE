import { useState } from "react";
import './Login.css'

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    
    const dataToSend = { userName, password };
    // do the request to get the userData
    const currentUserData = {
        accessToken: "123",
        refreshToken: "456",
        userName: "Pavel",
        email: "Pavel@Email"
    };

    props.onGettingUserData(currentUserData);
    
  }

return <div className="form-wrapper">
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={(e) => setUserName(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
}

export default Login