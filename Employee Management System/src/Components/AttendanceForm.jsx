import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AttendanceForm = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    employee_id: '',
    date: '',
    check_in_time: '',
    check_out_time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", attendance); /

    axios.post("http://localhost:3000/auth/mark_attendance", attendance)
      .then(result => {
        if (result.data.Status) {
          navigate(`/dashboard/employee/${attendance.employee_id}/mark_attendance`);
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Mark Attendance</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              name="employee_id"
              value={attendance.employee_id}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Employee ID"
            />
          </div>

          <div className="col-12">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>

          <div className="col-12">
            <label htmlFor="checkInTime">Check-in Time:</label>
            <input
              type="time"
              id="checkInTime"
              name="check_in_time"
              value={attendance.check_in_time}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>

          <div className="col-12">
            <label htmlFor="checkOutTime">Check-out Time:</label>
            <input
              type="time"
              id="checkOutTime"
              name="check_out_time"
              value={attendance.check_out_time}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;
