import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';


const ShiftList = () => {
    const navigate=useNavigate()
    const [shift, setShift] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/shift")
          .then((result) => {
            if (result.data.Status) {
              setShift(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Shift List</h3>
      </div>
      <Link to="/dashboard/add_shift" className="btn btn-dark">
        Add Shift
      </Link>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Shift_name</th>
              <th>Start_time</th>
              <th>End_time</th>
                     </tr>
          </thead>
          <tbody>
            {shift.map((s,index) => (
              <tr key={index}>
                <td>{s.id}</td>                
                <td>{s.shift_name}</td>
                
                <td>{s.start_time}</td>
                <td>{s.end_time}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default ShiftList