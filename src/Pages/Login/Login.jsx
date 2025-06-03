import { useState } from "react";
import './Login.css'

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const requestData = 
    { 
      email,
      password 
    };

    fetch('https://localhost:7049/api/Account/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
      })
      .then(response =>
        response.json()
      )
      .then(result => {
        props.onGettingUserData(result);
      });
  }

return <div className="form-wrapper">
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
}

export default Login