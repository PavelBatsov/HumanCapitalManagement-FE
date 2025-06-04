import { useEffect, useState } from "react"
import "./User.css"

const User = (props) => {
    const [users, setUsers] = useState()
    const [userRoles, setUserRoles] = useState([])
    const [defaultForm, setDefaultForm] = useState({
        id: '',
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        roleName: '',
        roleId: ''
    })
    const [reloadCount, setReloadCount] = useState(0)
    const [isAddModelOpen, setIsAddModelOpen] = useState()

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
    }, [reloadCount])

    const onClickHandler = () =>{
        setIsAddModelOpen(undefined)
        setDefaultForm({
            id: '',
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            roleName: '',
            roleId: ''
        })
    }

    const onDeleteHandler = (id) =>{
        fetch(`https://localhost:7049/api/Account/Delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          }
        })
        .then(result => {
            setReloadCount(prev => ++prev);
        });
    }

    const  onSubmit = (event) => {
        event.preventDefault();

        const requestData = new FormData(event.target)

        fetch('https://localhost:7049/api/Account/UpdateAccount', {
          method: 'PUT',
          headers: {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
          //body: JSON.stringify(requestData)
          body: requestData
        })
        .then(result => {
            onClickHandler()
            setReloadCount(prev => ++prev);
        });
    }
    
    return <><h2 className="manager">
        Users Management
    </h2>
    <br/>
    <br/>
    {
      users && <table className="table">
      <thead>
        <tr>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => <tr key={user.id}>
          <td>{ user.userName }</td>
          <td>{ user.email }</td>
          <td>{ user.firstName }</td>
          <td>{ user.lastName }</td>
          <td>{ user.roleName }</td>
          <td>
              <button type="button" className="btn btn-outline-primary" onClick={() => {setDefaultForm(user), setIsAddModelOpen("Edit")}}>Edit</button> <button type="button" className="btn btn-outline-danger" onClick={() => onDeleteHandler(user.id)}>Delete</button>
          </td>
          </tr>)
        }
      </tbody>
    </table>
    }
    {
        isAddModelOpen && <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isAddModelOpen} User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onClickHandler()}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                {isAddModelOpen === 'Edit' ? <input type="hidden" className="form-control" name="id" defaultValue={defaultForm.id} /> : null}
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">UserName</label>
                  <input type="text" className="form-control" name="userName" defaultValue={defaultForm.userName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Email</label>
                  <input type="text" className="form-control" name="email" defaultValue={defaultForm.email} />
                </div>
                 <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Password</label>
                  <input type="password" className="form-control" name="password" />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">First Name</label>
                  <input type="text" className="form-control" name="firstName" defaultValue={defaultForm.firstName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Last Name</label>
                  <input type="text" className="form-control" name="lastName" defaultValue={defaultForm.lastName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Roles</label>
                <select className="form-select" aria-label="Default select example" name="roleId" defaultValue={defaultForm.roleId}>
                    <option defaultValue>Select a Role</option>
                    {
                        userRoles.map((userRole) => (
                            <option key={userRole.id} value={userRole.id}>
                                {userRole.name}
                            </option>))
                    }
                    </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => onClickHandler()}>Close</button>
                  <button type="submit" className="btn btn-outline-primary">{isAddModelOpen}</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    }
    </>
}

export default User