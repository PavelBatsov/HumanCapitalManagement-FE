import { useEffect, useState } from "react"
import "./Registraton.css"

const Registration = () => {
    const [users, setUsers] = useState()
    const [userRoles, setUserRoles] = useState([])

    useEffect(()=>{
        fetch('https://localhost:7049/api/Account/GetAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
        })
        .then(response =>
            response.json()
        )
        .then(result => {
            setUsers(result)
        });

        fetch('https://localhost:7049/api/Account/GetAllUserRoles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
        })
        .then(response =>
            response.json()
        )
        .then(result => {
            setUserRoles(result)
        });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();

        const requestData = new FormData(event.target)

        fetch('https://localhost:7049/api/Account/Register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })
        .then(result => {});
    }
    
    return <> <div className="registration">
        <h2 className="header">
            Register User
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">UserName</label>
            <input type="text" className="form-control" name="userName" />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Email</label>
            <input type="text" className="form-control" name="email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">First Name</label>
            <input type="text" className="form-control" name="firstName"  />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName"  />
          </div>
          <div className="mb-3">
             <label htmlFor="recipient-name" className="col-form-label">Roles</label>
                <select className="form-select" aria-label="Default select example" name="roleId" >
                  <option defaultValue>Select a Role</option>
                  {
                      userRoles.map((userRole) => (
                          <option key={userRole.id} value={userRole.id}>
                              {userRole.name}
                          </option>))
                  }
                </select>
          </div>
          <button type="submit" className="btn btn-outline-primary">Add</button>
        </form>
        </div>
    </>
}

export default Registration