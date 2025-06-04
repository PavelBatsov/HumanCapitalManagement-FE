import { useEffect, useState } from "react"
import "./Registraton.css"
import { useNavigate } from "react-router";

const Registration = () => {
    const navigate = useNavigate();
    const [userRoles, setUserRoles] = useState([])

    useEffect(()=>{
        fetch('https://localhost:7049/api/Account/GetAllUserRoles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

        requestData.append("Address.Address", event.target.address.value);
        requestData.append("Address.City", event.target.city.value);
        requestData.append("Address.Country", event.target.country.value);
        requestData.append("Address.PostCode", event.target.postCode.value);

        fetch('https://localhost:7049/api/Account/Register', {
          method: 'POST',
          headers: {
          },
          body: requestData
        })
        .then(result => {
            navigate("/");
        });
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
            <label htmlFor="recipient-name" className="col-form-label">Address</label>
            <input type="text" className="form-control" name="address"  />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">City</label>
            <input type="text" className="form-control" name="city"  />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Country</label>
            <input type="text" className="form-control" name="country"  />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Post Code</label>
            <input type="text" className="form-control" name="postCode"  />
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