import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet ,useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([])
  const {id} = useParams()
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/'+id)
    .then(result => {
        setEmployee(result.data[0])
    })
    .catch(err => console.log(err))
}, [])

const handleLogout = () => {
  axios.get('http://localhost:3000/employee/logout')
  .then(result => {
    if(result.data.Status) {
      localStorage.removeItem("valid")
      navigate('/')
    }
  }).catch(err => console.log(err))
}

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to={"/employee_detail/"+id}
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <i className="fs-4 bi-activity icon"></i>
              <span className="fs-2 fw-bolder d-none d-sm-inline">
                TeamSync
              </span>
              <i className=" fs-4 bi-activity icon "></i>
            </Link>

            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >

              <li className="w-100">
                <Link
                  to={"/employee_detail/"+id+"/profile"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to={"/employee_detail/"+id+"/attendance"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-clipboard-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Attendance</span>
                </Link>
              </li>

              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
        <div className="col p-0 m-0 ">
          <div className="p-2 d-flex justify-content-center shadow ">
            <h4 className="mt-2">Employee Management System</h4>
          </div>
          <div className="p-2">
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail