// AttendanceManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AttendanceManagement = () => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState([]);
    
  
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/attendance/${id}`)
      .then(result => {
        setAttendance(result.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
    <h3 className='d-flex justify-content-center mb-2'>Attendance Management</h3>
    <h5 className='d-flex justify-content-center'>Employee ID: {id}</h5>
    

    <div className="mt-4">
        <table className="table">
      <thead>
        <tr >
          <th>Date</th>
          <th>Check-in Time</th>
          <th>Check-out Time</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((a, index) => (
          <tr key={index}>
          <td>{a.date}</td>
          <td>{a.check_in_time}</td>
          <td>{a.check_out_time}</td>
        </tr>
        
        ))}
      </tbody>
    </table>
    </div>
  </div>
  
  );
};

export default AttendanceManagement;
