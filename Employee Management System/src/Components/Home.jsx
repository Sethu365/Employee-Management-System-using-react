import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const[adminTotal,setAdminTotal]=useState()
  const[employeeTotal,setemployeeTotal]=useState()
  const[salaryTotal,setSalaryTotal]=useState()
  const [admins, setAdmins] = useState([])

  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  },[])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }

   const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_admin/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 


  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-lg w-25 rounded '>
        <div className='text-center pb-1 '>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5 style={{ color: 'red' }}>{adminTotal}</h5>
          
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-lg w-25 rounded'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5 style={{ color: 'red' }}>{employeeTotal}</h5>
          
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-lg w-25 rounded'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5 style={{ color: 'red' }}>₹{salaryTotal}</h5>
          
        </div>
      </div>
    </div>
    <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                  {/* <button
                    className="btn btn-success btn-sm me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button> */}

                  <button
                    className="btn btn-danger btn-sm ms-2" onClick={()=>handleDelete(a.id)}>
                     <i class="bi bi-trash3-fill"></i>
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
)
}

 export default Home