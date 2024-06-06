import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShiftForm = () => {
    const navigate = useNavigate();
  const [shift, setShift] = useState({
    shift_name: '',
    start_time: '',
    end_time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", attendance); /

    axios.post("http://localhost:3000/auth/add_shift", shift)
      .then(result => {
        if (result.data.Status) {
          navigate(`/dashboard/add_shift`);
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShift({ ...shift, [name]: value });
  };



  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center"></h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Shift Name</label>
          <input
            type="text"
            className="form-control rounded-0"
            name="shift_name"
            value={shift.shift_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control rounded-0"
            name="start_time"
            value={shift.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="form-control rounded-0"
            name="end_time"
            value={shift.end_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-primary">
          Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ShiftForm;
