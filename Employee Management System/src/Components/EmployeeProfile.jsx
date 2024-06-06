import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
  
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
   
  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/${employee.image}`} className='emp_det_image' alt="Employee" />
            <div className='d-flex align-items-center flex-column mt-4'>
              <h3><strong>Name:</strong> {employee.name}</h3>
              <h3><strong>Email:</strong> {employee.email}</h3>
              <h3><strong>Location:</strong> {employee.address}</h3>
              <h3><strong>Salary:</strong> ₹ {employee.salary}</h3>
            </div>
           
          </div>
  )
}

export default EmployeeProfile