import { useEffect, useState } from "react"
import "./Employee.css"

const Employee = (props) => {
    const [employees, setEmployees] = useState()
    const [managers, setManagers] = useState([])
    const [defaultForm, setDefaultForm] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        employeeType: ''
    })
    const [reloadCount, setReloadCount] = useState(0)
    const [isAddModelOpen, setIsAddModelOpen] = useState()

    useEffect(()=>{
        fetch('https://localhost:7049/api/Employee/GetAll', {
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
            setEmployees(result)
        });

        fetch('https://localhost:7049/api/Manager/GetAll', {
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
            setManagers(result)
        });
    }, [reloadCount])

    const onClickHandler = () =>{
        setIsAddModelOpen(undefined)
        setDefaultForm({
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            employeeType: ''
        })
    }

    const onDeleteHandler = (id) =>{
        fetch(`https://localhost:7049/api/Employee/Delete/${id}`, {
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

        fetch(isAddModelOpen === 'Add' 
            ? 'https://localhost:7049/api/Employee/Create'
            : 'https://localhost:7049/api/Employee/Update', {
          method: isAddModelOpen === 'Add' ? 'POST' : 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
          body: requestData
        })
        .then(result => {
            onClickHandler()
            setReloadCount(prev => ++prev);
        });
    }
    
 
    return <><h2 className="employee">
        Employee
    </h2>
        <button type="button" className="btn btn-outline-success" onClick={() => setIsAddModelOpen("Add")}>Add</button>
    <br/>
    <br/>
    {
      employees && <table className="table">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
          <th scope="col">Employee Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map(employee => <tr key={employee.id}>
          <td>{ employee.email }</td>
          <td>{ employee.firstName }</td>
          <td>{ employee.lastName }</td>
          <td>{ employee.phoneNumber }</td>
          <td>{ employee.address }</td>
          <td>{ employee.employeeType }</td>
          <td>
              <button type="button" className="btn btn-outline-primary" onClick={() => {setDefaultForm(employee), setIsAddModelOpen("Edit")}}>Edit</button> <button type="button" className="btn btn-outline-danger" onClick={() => onDeleteHandler(employee.id)}>Delete</button>
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
              <h5 className="modal-title">{isAddModelOpen} Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onClickHandler()}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                  {isAddModelOpen === 'Edit' ? <input type="hidden" className="form-control" name="id" defaultValue={defaultForm.id} /> : null}
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Email</label>
                  <input type="text" className="form-control" name="email" defaultValue={defaultForm.email} />
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
                  <label htmlFor="recipient-name" className="col-form-label">Phone Number</label>
                  <input type="text" className="form-control" name="phoneNumber" defaultValue={defaultForm.phoneNumber} />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Address</label>
                  <input type="text" className="form-control" name="address" defaultValue={defaultForm.address} />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Employee Type</label>
                      <select className="form-select" aria-label="Default select example" name="employeeType" defaultValue={defaultForm.employeeType}>
                        <option defaultValue>Select an Employee type</option>
                        <option value="1">BE</option>
                        <option value="2">FE</option>
                        <option value="2">QA</option>
                        <option value="2">PM</option>
                      </select>
                    <label htmlFor="recipient-name" className="col-form-label">Manager</label>
                      <select className="form-select" aria-label="Default select example" name="managerId" >
                        <option defaultValue>Select a Manager</option>
                        {
                            managers.map((manager) => (
                                <option key={manager.id} value={manager.id}>
                                    {manager.email}
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

export default Employee